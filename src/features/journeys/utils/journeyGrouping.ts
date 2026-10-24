import type { Journey } from "@/features/journeys/utils/journeyCalculator";

export type JourneyGrouping = "file" | "month";

export type JourneyGroup = {
	displayName: string;
	journeys: Journey[];
};

const GROUP_NAMES: Record<JourneyGrouping, (journey: Journey) => string> = {
	file: (journey) => journey.fileName,
	month: (journey) =>
		journey.datetime.toLocaleString("en-GB", {
			month: "short",
			year: "2-digit",
		}),
};

export const groupJourneys = (
	journeys: Journey[],
	grouping: JourneyGrouping,
): JourneyGroup[] => {
	const sortedJourneys = sortByTime(journeys);

	return [
		...groupBy(sortedJourneys, GROUP_NAMES[grouping]),
		{ displayName: "All", journeys: sortedJourneys },
	];
};

const groupBy = (
	journeys: Journey[],
	getGroupName: (journey: Journey) => string,
): JourneyGroup[] =>
	[...Map.groupBy(journeys, getGroupName)].map(([displayName, journeys]) => ({
		displayName,
		journeys,
	}));

const sortByTime = (journeys: Journey[]) =>
	journeys.toSorted((a, b) => a.datetime.getTime() - b.datetime.getTime());
