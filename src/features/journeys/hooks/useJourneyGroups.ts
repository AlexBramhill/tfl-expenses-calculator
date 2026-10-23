import { useMemo, useState } from "react";
import type { Journey } from "@/features/journeys";
import {
	groupJourneys,
	type JourneyGroup,
	type JourneyGrouping,
} from "../utils/journeyGrouping";
import type { State } from "./useJourneys";

const NEXT_GROUPING: Record<JourneyGrouping, JourneyGrouping> = {
	month: "file",
	file: "month",
};

const useJourneyGroups = (journeys: State<Journey>) => {
	const [journeyGrouping, setJourneyGrouping] =
		useState<JourneyGrouping>("month");
	const [selectedGroupName, setSelectedGroupName] = useState<string>();

	const groupedJourneys = useMemo(
		() =>
			journeys.status === "success"
				? groupJourneys(journeys.data, journeyGrouping)
				: [],
		[journeys, journeyGrouping],
	);

	const selectedGroup =
		findGroupNamed(groupedJourneys, selectedGroupName) ?? groupedJourneys.at(0);

	const toggleJourneyGrouping = () => {
		setJourneyGrouping((current) => NEXT_GROUPING[current]);
		setSelectedGroupName(undefined);
	};

	return {
		groupedJourneys,
		journeyGrouping,
		selectedGroup,
		selectJourneyGroup: setSelectedGroupName,
		toggleJourneyGrouping,
	};
};

const findGroupNamed = (groups: JourneyGroup[], name: string | undefined) =>
	groups.find((group) => group.displayName === name);

export default useJourneyGroups;
