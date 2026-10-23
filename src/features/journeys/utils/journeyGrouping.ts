import type { Journey } from "./journeyCalculator";

export type JourneyGrouping = "file" | "month";

export type JourneyGroup = {
	displayName: string;
	journeys: Journey[];
};

type SortValue = string | number;

type GroupKey = { displayName: string; sortValue: SortValue };

const GROUP_KEYS: Record<JourneyGrouping, (journey: Journey) => GroupKey> = {
	file: (journey) => ({
		displayName: journey.fileName,
		sortValue: journey.fileName,
	}),
	month: (journey) => ({
		displayName: journey.datetime.toLocaleString("default", { month: "long" }),
		sortValue: journey.datetime.getMonth(),
	}),
};

export const groupJourneys = (
	journeys: Journey[],
	grouping: JourneyGrouping,
): JourneyGroup[] =>
	[...collectGroups(journeys, GROUP_KEYS[grouping])]
		.sort(([a], [b]) => compareSortValues(a, b))
		.map(([, group]) => ({ ...group, journeys: sortByTime(group.journeys) }));

const collectGroups = (
	journeys: Journey[],
	getGroupKey: (journey: Journey) => GroupKey,
) => {
	const groups = new Map<SortValue, JourneyGroup>();
	for (const journey of journeys) {
		const { displayName, sortValue } = getGroupKey(journey);
		const group = groups.get(sortValue) ?? { displayName, journeys: [] };
		group.journeys.push(journey);
		groups.set(sortValue, group);
	}
	return groups;
};

const compareSortValues = (a: SortValue, b: SortValue) =>
	String(a).localeCompare(String(b), undefined, { numeric: true });

const sortByTime = (journeys: Journey[]) =>
	journeys.toSorted((a, b) => a.datetime.getTime() - b.datetime.getTime());
