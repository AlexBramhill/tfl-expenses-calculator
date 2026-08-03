import { useInput } from "ink";
import { useMemo, useState } from "react";
import type { UnprocessedJourney } from "../repos/tflCsvParser";
import type { State } from "./useJourneys";

export type JourneyGrouping = "file" | "month";

type DisplayName = string;
type SortValue = string | number;

type JourneyGroupByKey = { displayName: DisplayName; sortValue: SortValue };
export type JourneyGroup = {
	displayName: DisplayName;
	journeys: UnprocessedJourney[];
};

const journeyReducerKeys: Record<
	JourneyGrouping,
	(journey: UnprocessedJourney) => JourneyGroupByKey
> = {
	file: (journey) => ({
		displayName: journey.fileName,
		sortValue: journey.fileName,
	}),
	month: (journey) => ({
		displayName: journey.datetime.toLocaleString("default", {
			month: "long",
		}),
		sortValue: journey.datetime.getMonth(),
	}),
};

function groupByKey(
	journeySort: "file" | "month",
	journeys: UnprocessedJourney[],
): JourneyGroup[] {
	const groupsByKey = new Map<SortValue, JourneyGroup>();
	const getKey = journeyReducerKeys[journeySort];

	journeys.forEach((journey: UnprocessedJourney) => {
		const { displayName, sortValue } = getKey(journey);
		const group = groupsByKey.get(sortValue) ?? { displayName, journeys: [] };
		group.journeys.push(journey);
		groupsByKey.set(sortValue, group);
	});

	groupsByKey.forEach(({ journeys }) => {
		journeys.sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
	});

	return [...groupsByKey]
		.sort(([aSortValue], [bSortValue]) =>
			aSortValue
				.toString()
				.localeCompare(bSortValue.toString(), undefined, { numeric: true }),
		)
		.map(([_sortValue, journeyGroupValue]) => journeyGroupValue);
}

const groupJourneys = (
	journeys: State<UnprocessedJourney>,
	journeyGrouping: JourneyGrouping,
): JourneyGroup[] => {
	if (journeys.status !== "success") return [];
	return groupByKey(journeyGrouping, journeys.data);
};

function useGroupedJourneys(
	journeys: State<UnprocessedJourney>,
	initialState: JourneyGrouping = "month",
) {
	const [journeyGrouping, setJourneyGrouping] =
		useState<JourneyGrouping>(initialState);

	const groupedJourneys = useMemo(
		() => groupJourneys(journeys, journeyGrouping),
		[journeys, journeyGrouping],
	);

	return { groupedJourneys, journeyGrouping, setJourneyGrouping };
}

export function useGroupedJourneyNavigation(
	setJourneyGrouping: (
		value: (prevState: JourneyGrouping) => JourneyGrouping,
	) => void,
) {
	useInput((input) => {
		if (input === "t") {
			// Todo: refactor this so we have an easy list to manage state change
			setJourneyGrouping((oldValue) => {
				switch (oldValue) {
					case "month":
						return "file";
					case "file":
						return "month";
				}
			});
		}
	});
}

export default useGroupedJourneys;
