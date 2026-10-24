import { describe, expect, it } from "vitest";
import { getTotalSummary } from "@/features/journeys/utils/journeySummaryCalculator";
import { DEFAULT_JOURNEY } from "@/test/fixtures";

describe("getTotalSummary", () => {
	it("totals only home to office journeys", () => {
		const summary = getTotalSummary([
			{
				...DEFAULT_JOURNEY,
				datetime: WEDNESDAY_MORNING,
				isHomeOfficeJourney: true,
			},
			{
				...DEFAULT_JOURNEY,
				datetime: WEDNESDAY_EVENING,
				isHomeOfficeJourney: true,
			},
			{
				...DEFAULT_JOURNEY,
				datetime: THURSDAY_MORNING,
				isHomeOfficeJourney: true,
			},
			{
				...DEFAULT_JOURNEY,
				datetime: THURSDAY_MORNING,
				isHomeOfficeJourney: false,
			},
		]);

		expect(summary.totalDaysInOffice).toBe(2);
		expect(summary.totalTrips).toBe(3);
		expect(summary.totalCharge).toBeCloseTo(8.4);
	});

	it("returns zeros when there are no journeys", () => {
		expect(getTotalSummary([])).toEqual({
			totalDaysInOffice: 0,
			totalTrips: 0,
			totalCharge: 0,
		});
	});
});

const WEDNESDAY_MORNING = new Date("2026-07-01T08:12");
const WEDNESDAY_EVENING = new Date("2026-07-01T17:48");
const THURSDAY_MORNING = new Date("2026-07-02T08:12");
