import { describe, expect, it } from "vitest";
import { processJourneys } from "@/features/journeys/utils/journeyCalculator";
import { DEFAULT_JOURNEY, HOME_STATION, OFFICE_STATION } from "@/test/fixtures";

describe("processJourneys", () => {
	it.each([
		{
			trip: "a weekday trip from home to the office",
			journey: { date: WEDNESDAY, from: HOME_STATION, to: OFFICE_STATION },
		},
		{
			trip: "a weekday trip from the office to home",
			journey: { date: WEDNESDAY, from: OFFICE_STATION, to: HOME_STATION },
		},
		{
			trip: "a weekend trip with weekends included",
			journey: {
				date: SATURDAY,
				from: HOME_STATION,
				to: OFFICE_STATION,
				isIncludingWeekends: true,
			},
		},
	])("counts $trip", ({ journey }) => {
		expect(isHomeOfficeJourney(journey)).toBe(true);
	});

	it.each([
		{
			trip: "a trip from home to anywhere else",
			journey: { date: WEDNESDAY, from: HOME_STATION, to: "Riverside Market" },
		},
		{
			trip: "a weekend trip to the office",
			journey: { date: SATURDAY, from: HOME_STATION, to: OFFICE_STATION },
		},
	])("ignores $trip", ({ journey }) => {
		expect(isHomeOfficeJourney(journey)).toBe(false);
	});
});

const WEDNESDAY = "2026-07-01";
const SATURDAY = "2026-07-04";

const isHomeOfficeJourney = ({
	date,
	from,
	to,
	isIncludingWeekends = false,
}: {
	date: string;
	from: string;
	to: string;
	isIncludingWeekends?: boolean;
}) => {
	const [journey] = processJourneys({
		journeys: [
			{
				...DEFAULT_JOURNEY,
				datetime: new Date(`${date}T08:12`),
				startStation: from,
				endStation: to,
			},
		],
		homeStations: [HOME_STATION],
		officeStations: [OFFICE_STATION],
		isIncludingWeekends,
	});
	return journey.isHomeOfficeJourney;
};
