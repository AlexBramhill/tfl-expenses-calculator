import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, onTestFinished } from "vitest";
import { parseCsv } from "@/features/journeys/api/tflCsvParser";
import {
	FIXTURE_CSV_PATH,
	HOME_STATION,
	OFFICE_STATION,
} from "@/test/fixtures";

describe("parseCsv", () => {
	it("parses each row of a TfL statement into a journey", async () => {
		const [firstJourney] = await parseCsv(FIXTURE_CSV_PATH);

		expect(firstJourney).toEqual({
			datetime: new Date("2026-07-01T08:12"),
			startStation: HOME_STATION,
			endStation: OFFICE_STATION,
			chargeAmount: 2.8,
			fileName: "journeys.csv",
		});
	});

	it("keeps actions without a destination", async () => {
		const filePath = await writeCsvWithRows("01-Jul-2026,09:00,Auto top-up,0");

		const [journey] = await parseCsv(filePath);

		expect(journey.startStation).toBe("Auto top-up");
		expect(journey.endStation).toBe("");
	});

	it("skips rows with an invalid date", async () => {
		const filePath = await writeCsvWithRows(
			"not-a-date,09:00,A to B,1.00",
			"01-Jul-2026,09:00,A to B,1.00",
		);

		expect(await parseCsv(filePath)).toHaveLength(1);
	});
});

const CSV_HEADER = "Date,Start Time,Journey/Action,Charge";

const writeCsvWithRows = async (...rows: string[]) => {
	const folder = await fs.mkdtemp(path.join(os.tmpdir(), "tfl-csv-"));
	onTestFinished(() => fs.rm(folder, { recursive: true }));

	const filePath = path.join(folder, "statement.csv");
	await fs.writeFile(filePath, [CSV_HEADER, ...rows].join("\n"));
	return filePath;
};
