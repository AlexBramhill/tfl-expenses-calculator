import fs from "node:fs/promises";
import { logDebug } from "../logPublisher";

export const listCsvFiles = async (folder: string) => {
	logDebug(`Listing CSV files in folder: ${folder}`);
	const files = await fs.readdir(folder);
	logDebug(`Files ${files.length} files in folder: ${folder}`);
	const csvs = files.filter((file) => file.endsWith(".csv"));
	logDebug(`Found ${csvs.length} CSV files in folder: ${folder}`);
	return csvs;
};

export const readFile = async (file: string) => {
	return fs.readFile(file, "utf8");
};
