import fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { z } from "zod";

const DOTFILE_FOLDER = path.join(os.homedir(), ".tfl-expense-calculator");
export const ConfigSchema = z.object({
	csvFolder: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;

export const DEFAULT_CONFIG: Config = {
	csvFolder: path.join(DOTFILE_FOLDER, "csv"),
};

const CONFIG_PATH = path.join(DOTFILE_FOLDER, "config.json");

export const isConfigPresent = async () => {
	try {
		const stat = await fs.stat(CONFIG_PATH);
		return stat.isFile();
	} catch (err) {
		return false;
	}
};

export const loadConfig = async () => {
	const raw = await fs.readFile(CONFIG_PATH, "utf8");

	const json = JSON.parse(raw);

	return ConfigSchema.parse(json);
};

export const createDefaultConfig = async () => {
	return await writeConfig(DEFAULT_CONFIG);
};

export const writeConfig = async (config: Config) => {
	await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf8");
};
