import fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { z } from "zod";
import { logError, logInfo } from "../logPublisher";

const DOTFILE_FOLDER = path.join(os.homedir(), ".tfl-expense-calculator");
export const ConfigSchema = z.object({
	csvFolder: z.string(),
	homeStations: z.array(z.string()).default([]),
	officeStations: z.array(z.string()).default([]),
	ignoreWeekends: z.boolean().default(true),
});

export type Config = z.infer<typeof ConfigSchema>;

export const DEFAULT_CONFIG: Config = {
	csvFolder: path.join(DOTFILE_FOLDER, "csv"),
	homeStations: [],
	officeStations: [],
	ignoreWeekends: true,
};

const CONFIG_PATH = path.join(DOTFILE_FOLDER, "config.json");

export const loadConfig = async () => {
	try {
		const raw = await fs.readFile(CONFIG_PATH, "utf8");
		return ConfigSchema.parse(JSON.parse(raw));
	} catch (err) {
		if (
			err instanceof Error &&
			(err as NodeJS.ErrnoException).code === "ENOENT"
		) {
			logInfo("Creating config file");
			return createDefaultConfig();
		}
		if (err instanceof Error) {
			logError(err.message);
		}
		throw err;
	}
};

export const createDefaultConfig = async () => {
	fs.mkdir(DOTFILE_FOLDER, { recursive: true });
	return await writeConfig(DEFAULT_CONFIG);
};

export const writeConfig = async (config: Config) => {
	await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf8");
	return config;
};
