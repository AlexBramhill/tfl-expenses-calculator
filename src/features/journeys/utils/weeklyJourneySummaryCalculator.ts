import type { Journey } from "./journeyCalculator";

export type WeeklyJourneySubSummary = {
	totalDaysInOffice: number;
	totalTrips: number;
	totalCharge: number;
};

export type WeeklyJourneySummary = WeeklyJourneySubSummary & {
	isPotentiallyIncomplete: boolean;
};
export type WeeklySummaryByDate = Record<string, WeeklyJourneySummary>;

const getWeekStart = (date: Date): Date => {
	const d = new Date(date);
	const day = d.getDay();

	const diff = day === 0 ? -6 : 1 - day;

	d.setDate(d.getDate() + diff);
	d.setHours(0, 0, 0, 0);

	return d;
};

function isPotentiallyIncomplete(
	weekStart: Date,
	firstWeekStart: Date,
	journeys: Journey[],
	lastWeekStart: Date,
	ignoreWeekends: boolean,
) {
	if (weekStart.getTime() === firstWeekStart.getTime())
		return isFirstGroupPotentiallyIncomplete(journeys);
	if (weekStart.getTime() === lastWeekStart.getTime())
		return isLastGroupPotentiallyIncomplete(journeys, ignoreWeekends);
	return false;
}

export const getWeeklySummaries = (
	journeys: Journey[],
	ignoreWeekends: boolean,
): WeeklySummaryByDate => {
	const groups = Map.groupBy(journeys, (journey) =>
		getWeekStart(journey.datetime).getTime(),
	);

	const sortedJourneys = [...journeys].sort(
		(x, y) => x.datetime.getTime() - y.datetime.getTime(),
	);

	const firstWeekStart = getWeekStart(sortedJourneys[0].datetime);

	const lastWeekStart = getWeekStart(
		sortedJourneys[sortedJourneys.length - 1].datetime,
	);

	return Object.fromEntries(
		[...groups.entries()].map(([weekStartTime, journeys]) => {
			const weekStart = new Date(weekStartTime);
			return [
				weekStart.toISOString(),
				{
					...getTotalSummary(journeys),
					isPotentiallyIncomplete: isPotentiallyIncomplete(
						weekStart,
						firstWeekStart,
						journeys,
						lastWeekStart,
						ignoreWeekends,
					),
				},
			];
		}),
	);
};

function getJourneysContainDay(lastWeekJourneys: Journey[], dayIndex: number) {
	return lastWeekJourneys.some(
		(journey) => journey.datetime.getDay() === dayIndex,
	);
}

const isFirstGroupPotentiallyIncomplete = (
	firstWeekJourneys: Journey[],
): boolean => {
	const dayIndex = 1;
	return !getJourneysContainDay(firstWeekJourneys, dayIndex);
};

const isLastGroupPotentiallyIncomplete = (
	lastWeekJourneys: Journey[],
	IsIncludingWeekends: boolean,
): boolean => {
	const dayIndexes = IsIncludingWeekends ? [0] : [5, 6, 0];
	return !dayIndexes.some((dayIndex) =>
		getJourneysContainDay(lastWeekJourneys, dayIndex),
	);
};

const getTotalSummary = (journeys: Journey[]): WeeklyJourneySubSummary => {
	const homeOfficeJourneys = journeys.filter(
		(journey) => journey.isHomeOfficeJourney,
	);
	const totalDaysInOffice = new Set(
		homeOfficeJourneys.map((x) => x.datetime.toDateString()),
	).size;
	const totalTrips = homeOfficeJourneys.length;
	const totalCharge = homeOfficeJourneys.reduce(
		(sum, journey) => sum + journey.chargeAmount,
		0,
	);

	return {
		totalDaysInOffice,
		totalTrips,
		totalCharge,
	};
};
