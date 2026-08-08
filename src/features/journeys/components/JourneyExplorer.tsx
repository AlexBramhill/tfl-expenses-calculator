import { Box, Text, useFocus } from "ink";
import type { Config } from "@/features/config";
import useJourneyGrouping, {
	useJourneyGroupingSelection,
} from "../hooks/useJourneyGrouping";
import useJourneys from "../hooks/useJourneys";
import useListNavigation from "../hooks/useListNavigation";
import { DaysInOfficePerWeekSummary } from "./DaysInOfficeWeeklySummary";
import JourneyDetailPanel from "./JourneyDetailPanel";
import JourneyGroupExplorer from "./JourneyGroupExplorer";

function JourneyExplorer({ config }: { config: Config }) {
	const { isFocused } = useFocus({ autoFocus: true });

	const ungroupedJourneys = useJourneys(config);
	const { groupedJourneys, journeyGrouping, setJourneyGrouping } =
		useJourneyGrouping(ungroupedJourneys);

	const { selectedItem: selectedJourney } = useListNavigation(
		groupedJourneys,
		(item) => item.displayName,
		isFocused,
	);

	useJourneyGroupingSelection(setJourneyGrouping);

	if (ungroupedJourneys.status === "loading") return <Text>Loading...</Text>;
	if (ungroupedJourneys.status === "error")
		return <Text>Error: {ungroupedJourneys.error.message}</Text>;
	if (groupedJourneys.length === 0) return <Text>No journeys found.</Text>;

	return (
		<Box flexDirection="row" gap={2} flexGrow={1}>
			<JourneyGroupExplorer
				journeyGrouping={journeyGrouping}
				groupedJourneys={groupedJourneys}
				selectedJourney={selectedJourney}
				isFocused={isFocused}
			/>
			{selectedJourney && (
				<>
					<DaysInOfficePerWeekSummary
						journeys={selectedJourney.journeys}
						isIncludingWeekends={config.isIncludingWeekends}
					/>
					<JourneyDetailPanel
						key={selectedJourney.displayName}
						journeys={selectedJourney.journeys}
					/>
				</>
			)}
		</Box>
	);
}

export default JourneyExplorer;
