import { Alert, Spinner } from "@inkjs/ui";
import { Box } from "ink";
import { useEffect, useMemo, useState } from "react";
import type { Config } from "@/api/configRepo";
import useJourneyGrouping, {
	type JourneyGroup,
	useJourneyGroupingSelection,
} from "../hooks/useJourneyGrouping";
import useJourneys from "../hooks/useJourneys";
import { getTotalSummary } from "../utils/journeySummaryCalculator";
import {
	getWeekKeys,
	getWeeklySummaries,
} from "../utils/weeklyJourneySummaryCalculator";
import { DaysInOfficePerWeekSummary } from "./DaysInOfficeWeeklySummary";
import JourneyDetailPanel from "./JourneyDetailPanel";
import JourneyGroupExplorer from "./JourneyGroupExplorer";
import { Summary } from "./Summary";

function JourneyExplorer({ config }: { config: Config }) {
	const ungroupedJourneys = useJourneys(config);
	const { groupedJourneys, journeyGrouping, setJourneyGrouping } =
		useJourneyGrouping(ungroupedJourneys);

	const [selectedJourney, setSelectedJourney] = useState<JourneyGroup>();

	useEffect(() => {
		setSelectedJourney(groupedJourneys[0]);
	}, [groupedJourneys]);

	useJourneyGroupingSelection(setJourneyGrouping);

	const weeklySummaries = useMemo(
		() =>
			ungroupedJourneys.status === "success"
				? getWeeklySummaries(ungroupedJourneys.data)
				: {},
		[ungroupedJourneys],
	);

	if (ungroupedJourneys.status === "loading")
		return <Spinner label="Loading" />;
	if (ungroupedJourneys.status === "error")
		return (
			<Alert variant="error">Error: {ungroupedJourneys.error.message}</Alert>
		);
	if (groupedJourneys.length === 0)
		return <Alert variant="error">No journeys found</Alert>;

	return (
		<Box flexDirection="row" gap={2} flexGrow={1}>
			<JourneyGroupExplorer
				journeyGrouping={journeyGrouping}
				groupedJourneys={groupedJourneys}
				onSelectJourney={setSelectedJourney}
			/>
			{selectedJourney && (
				<>
					<Summary summary={getTotalSummary(selectedJourney.journeys)} />
					<DaysInOfficePerWeekSummary
						weeklySummaries={weeklySummaries}
						currentGroupWeeks={getWeekKeys(selectedJourney.journeys)}
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
