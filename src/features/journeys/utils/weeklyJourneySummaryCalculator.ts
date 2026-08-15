import type { Journey } from "./journeyCalculator";
import {
	getTotalSummary,
	type JourneySummaryTotals,
} from "./journeySummaryCalculator";

export type WeeklyJourneySummary = JourneySummaryTotals & {
	isPotentiallyIncomplete: boolean;
};
export type WeeklySummaryByDate = Record<string, WeeklyJourneySummary>;

export const getWeekKeys = (journeys: Journey[]): Set<string> =>
	new Set(
		journeys.map((journey) => getWeekStart(journey.datetime).toISOString()),
	);

const getWeekStart = (date: Date): Date => {
	const d = new Date(date);
	const day = d.getDay();

	const diff = day === 0 ? -6 : 1 - day;

	d.setDate(d.getDate() + diff);
	d.setHours(0, 0, 0, 0);

	return d;
};

const addWeeks = (date: Date, weeks: number): Date => {
	const d = new Date(date);
	d.setDate(d.getDate() + weeks * 7);
	return d;
};

function isPotentiallyIncomplete(
	weekStart: Date,
	weekStartKeys: Set<string>,
): boolean {
	return (
		!weekStartKeys.has(addWeeks(weekStart, -1).toISOString()) ||
		!weekStartKeys.has(addWeeks(weekStart, 1).toISOString())
	);
}

export const getWeeklySummaries = (
	journeys: Journey[],
): WeeklySummaryByDate => {
	if (journeys.length === 0) return {};

	const groups = Map.groupBy(journeys, (journey) =>
		getWeekStart(journey.datetime).toISOString(),
	);

	const weekStartKeys = new Set(groups.keys());

	return Object.fromEntries(
		[...groups.entries()].map(([weekStartIso, journeys]) => {
			const weekStart = new Date(weekStartIso);
			return [
				weekStartIso,
				{
					...getTotalSummary(journeys),
					isPotentiallyIncomplete: isPotentiallyIncomplete(
						weekStart,
						weekStartKeys,
					),
				},
			];
		}),
	);
};
