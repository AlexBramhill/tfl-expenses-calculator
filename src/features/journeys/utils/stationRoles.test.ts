import { describe, expect, it } from "vitest";
import { FIXTURE_CONFIG } from "@/test/fixtures";
import {
	getNextStationRole,
	getStationRole,
	withStationRole,
} from "./stationRoles";

describe("getStationRole", () => {
	it.each([
		{
			behaviour: "is none in neither list",
			home: [],
			office: [],
			expected: "none",
		},
		{
			behaviour: "is home in the home list",
			home: [STATION],
			office: [],
			expected: "home",
		},
		{
			behaviour: "is office in the office list",
			home: [],
			office: [STATION],
			expected: "office",
		},
		{
			behaviour: "is both in both lists",
			home: [STATION],
			office: [STATION],
			expected: "both",
		},
	])("$behaviour", ({ home, office, expected }) => {
		const stationLists = { homeStations: home, officeStations: office };
		expect(getStationRole(STATION, stationLists)).toBe(expected);
	});
});

describe("getNextStationRole", () => {
	it.each([
		{
			behaviour: "moves forward",
			role: "none",
			direction: 1,
			expected: "home",
		},
		{
			behaviour: "moves back",
			role: "office",
			direction: -1,
			expected: "home",
		},
		{
			behaviour: "wraps past the last role",
			role: "both",
			direction: 1,
			expected: "none",
		},
		{
			behaviour: "wraps before the first role",
			role: "none",
			direction: -1,
			expected: "both",
		},
	] as const)("$behaviour", ({ role, direction, expected }) => {
		expect(getNextStationRole(role, direction)).toBe(expected);
	});
});

describe("withStationRole", () => {
	it("adds the station to both lists for both", () => {
		const config = withStationRole(FIXTURE_CONFIG, STATION, "both");

		expect(config.homeStations).toContain(STATION);
		expect(config.officeStations).toContain(STATION);
	});

	it("removes the station from both lists for none", () => {
		const config = withStationRole(
			{ ...FIXTURE_CONFIG, homeStations: [STATION], officeStations: [STATION] },
			STATION,
			"none",
		);

		expect(config.homeStations).not.toContain(STATION);
		expect(config.officeStations).not.toContain(STATION);
	});

	it("keeps the other stations and settings", () => {
		const config = withStationRole(FIXTURE_CONFIG, STATION, "home");

		expect(config).toEqual({
			...FIXTURE_CONFIG,
			homeStations: [...FIXTURE_CONFIG.homeStations, STATION],
		});
	});
});

const STATION = "Museum Quarter";
