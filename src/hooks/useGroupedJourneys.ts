import { useMemo, useState } from "react";
import type { Journey } from "../repos/tflCsvParser";
import type { State } from "./useJourneys";
import {infer} from "zod";

export const journeyGroupings=["file", "month"] as const;
type JourneyGrouping = typeof journeyGroupings[number];

type DisplayName = string;
type SortValue = string | number;

type JourneyGroupByKey = { displayName: DisplayName; sortValue: SortValue };
export type JourneyGroup = { displayName: DisplayName; journeys: Journey[] };

const journeyReducerKeys: Record<
	JourneyGrouping,
	(journey: Journey) => JourneyGroupByKey
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
	journeys: Journey[],
): JourneyGroup[] {
	const groupsByKey = new Map<SortValue, JourneyGroup>();
	const getKey = journeyReducerKeys[journeySort];

	journeys.forEach((journey: Journey) => {
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
	journeys: State<Journey>,
	journeyGrouping: JourneyGrouping,
): JourneyGroup[] => {
	if (journeys.status !== "success") return [];
	return groupByKey(journeyGrouping, journeys.data);
};

function useGroupedJourneys(
	journeys: State<Journey>,
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

export default useGroupedJourneys;
