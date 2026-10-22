import { describe, expect, it } from "vitest";
import { DEFAULT_JOURNEY } from "@/test/fixtures";
import {
	getWeekKeys,
	getWeeklySummaries,
} from "./weeklyJourneySummaryCalculator";

describe("getWeeklySummaries", () => {
	it("groups journeys into weeks starting on Monday", () => {
		const summaries = getWeeklySummaries([
			{
				...DEFAULT_JOURNEY,
				datetime: FIRST_WEEK.monday,
				isHomeOfficeJourney: true,
			},
			{
				...DEFAULT_JOURNEY,
				datetime: FIRST_WEEK.wednesday,
				isHomeOfficeJourney: true,
			},
			{
				...DEFAULT_JOURNEY,
				datetime: FIRST_WEEK.sunday,
				isHomeOfficeJourney: true,
			},
		]);

		expect(Object.keys(summaries)).toEqual([weekKey(FIRST_WEEK)]);
		expect(summaries[weekKey(FIRST_WEEK)].totalDaysInOffice).toBe(3);
	});

	it("flags weeks without a recorded week either side as potentially incomplete", () => {
		const summaries = getWeeklySummaries([
			{ ...DEFAULT_JOURNEY, datetime: FIRST_WEEK.monday },
			{ ...DEFAULT_JOURNEY, datetime: SECOND_WEEK.monday },
			{ ...DEFAULT_JOURNEY, datetime: THIRD_WEEK.monday },
		]);

		expect(
			Object.values(summaries).map((week) => week.isPotentiallyIncomplete),
		).toEqual([true, false, true]);
	});

	it("returns no weeks when there are no journeys", () => {
		expect(getWeeklySummaries([])).toEqual({});
	});
});

describe("getWeekKeys", () => {
	it("returns the start of each week with a journey", () => {
		expect(
			getWeekKeys([
				{ ...DEFAULT_JOURNEY, datetime: FIRST_WEEK.wednesday },
				{ ...DEFAULT_JOURNEY, datetime: SECOND_WEEK.thursday },
			]),
		).toEqual(new Set([weekKey(FIRST_WEEK), weekKey(SECOND_WEEK)]));
	});
});

const FIRST_WEEK = {
	start: new Date("2026-07-06T00:00"),
	monday: new Date("2026-07-06T08:12"),
	wednesday: new Date("2026-07-08T08:12"),
	sunday: new Date("2026-07-12T08:12"),
};

const SECOND_WEEK = {
	start: new Date("2026-07-13T00:00"),
	monday: new Date("2026-07-13T08:12"),
	thursday: new Date("2026-07-16T08:12"),
};

const THIRD_WEEK = {
	start: new Date("2026-07-20T00:00"),
	monday: new Date("2026-07-20T08:12"),
};

const weekKey = (week: { start: Date }) => week.start.toISOString();
