import fs from "node:fs/promises";
import path from "node:path";
import { logDebug } from "@/features/logs";
import { isErrnoCode } from "@/utils/errors";

export const listCsvFiles = async (folder: string) => {
	logDebug(`Listing CSV files in folder: ${folder}`);
	try {
		const files = await fs.readdir(folder);
		logDebug(`Files ${files.length} files in folder: ${folder}`);

		const csvs = files
			.filter((file) => file.endsWith(".csv"))
			.map((file) => path.join(folder, file));
		logDebug(`Found ${csvs.length} CSV files in folder: ${folder}`);
		return csvs;
	} catch (err) {
		if (isErrnoCode(err, "ENOENT")) {
			await fs.mkdir(folder, { recursive: true });
			return [];
		}
		throw err;
	}
};
