import fs from "node:fs/promises";
import Papa from "papaparse";
import { z } from "zod";

const csvRawRow = z.object({
	Date: z.string(),
	"Start Time": z.string(),
	"Journey/Action": z.string(),
	Charge: z.string(),
});

const csvRowSchema = csvRawRow.transform((row) => {
	const [day, month, year] = row.Date.split("/");
	const datetime = new Date(`${year}-${month}-${day}T${row["Start Time"]}`);

	const [start, end] = row["Journey/Action"].split(" to ");
	const startStation = start.trim();
	const endStation = end?.replace(/\s*\[.*?\]/, "").trim() ?? "";

	const chargeAmount = parseFloat(row.Charge) || 0;

	return { datetime, startStation, endStation, chargeAmount };
});

export type Journey = z.infer<typeof csvRowSchema>;

export const parseCsv = async (filePath: string): Promise<Journey[]> => {
	const content = await fs.readFile(filePath, "utf8");
	const { data } = Papa.parse(content, { header: true, skipEmptyLines: true });
	return data.map((row) => csvRowSchema.parse(row));
};
