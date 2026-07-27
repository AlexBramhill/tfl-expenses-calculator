import {useMemo} from "react";
import type {Journey} from "../repos/tflCsvParser";
import type {CsvState} from "./useCsvsData";

export type JourneyGrouping = "file" | "month";

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
    const groupsByKey = new Map<
        SortValue,
        JourneyGroup
    >();
    const getKey = journeyReducerKeys[journeySort];

    journeys.forEach((journey: Journey) => {
        const {displayName, sortValue} = getKey(journey);
        const group = groupsByKey.get(sortValue) ?? {displayName, journeys: []};
        group.journeys.push(journey);
        groupsByKey.set(sortValue, group);
    });

    groupsByKey.forEach(({journeys}) => {
        journeys.sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
    });

    return [...groupsByKey]
        .sort(([aSortValue], [bSortValue]) =>
            aSortValue
                .toString()
                .localeCompare(bSortValue.toString(), undefined, {numeric: true}),
        ).map(([_sortValue, journeyGroupValue]) =>
            journeyGroupValue);
}

const groupJourneys = (
    csvDataState: CsvState<Journey>,
    journeySort: JourneyGrouping,
): JourneyGroup[] => {
    if (csvDataState.status !== "success") return [];
    return groupByKey(journeySort, csvDataState.data);
};

function useGroupedJourneys(
    csvDataState: CsvState<Journey>,
    journeySort: JourneyGrouping,
) {
    return useMemo(
        () => groupJourneys(csvDataState, journeySort),
        [csvDataState, journeySort],
    );
}

export default useGroupedJourneys;
