import type { Journey } from "./journeyCalculator";

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
): JourneyGroup[] =>
	[...Map.groupBy(sortByTime(journeys), GROUP_NAMES[grouping])].map(
		([displayName, journeys]) => ({ displayName, journeys }),
	);

const sortByTime = (journeys: Journey[]) =>
	journeys.toSorted((a, b) => a.datetime.getTime() - b.datetime.getTime());
