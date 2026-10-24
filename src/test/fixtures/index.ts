import path from "node:path";
import { fileURLToPath } from "node:url";
import { type Config, DEFAULT_THEME_COLOUR } from "@/api/configRepo";
import type { Journey } from "@/features/journeys";

export const HOME_STATION = "Home Station";
export const OFFICE_STATION = "Office Station";

export const FIXTURE_CSV_FOLDER = fileURLToPath(new URL(".", import.meta.url));
export const FIXTURE_CSV_PATH = path.join(FIXTURE_CSV_FOLDER, "journeys.csv");

export const FIXTURE_CONFIG: Config = {
	csvFolder: FIXTURE_CSV_FOLDER,
	homeStations: [HOME_STATION],
	officeStations: [OFFICE_STATION],
	isIncludingWeekends: false,
	themeColour: DEFAULT_THEME_COLOUR,
};

export const DEFAULT_JOURNEY: Readonly<Journey> = {
	datetime: new Date("2026-07-01T08:12"),
	startStation: HOME_STATION,
	endStation: OFFICE_STATION,
	chargeAmount: 2.8,
	fileName: "journeys.csv",
	isHomeOfficeJourney: true,
};
