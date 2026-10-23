import { Alert, Spinner } from "@inkjs/ui";
import { Box } from "ink";
import { useMemo } from "react";
import type { Config } from "@/api/configRepo";
import { Line } from "@/components/Line";
import useFullscreenShortcut from "../hooks/useFullscreenShortcut";
import useFullscreenToggle from "../hooks/useFullscreenToggle";
import useGroupingShortcut from "../hooks/useGroupingShortcut";
import { FullscreenContext } from "../hooks/useIsFullscreen";
import useJourneyGroups from "../hooks/useJourneyGroups";
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
	const {
		groupedJourneys,
		journeyGrouping,
		selectedGroup,
		selectJourneyGroup,
		toggleJourneyGrouping,
	} = useJourneyGroups(ungroupedJourneys);

	const { isFullscreen, toggleFullscreen } = useFullscreenToggle();

	useGroupingShortcut(toggleJourneyGrouping);
	useFullscreenShortcut(toggleFullscreen);

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
	if (!selectedGroup) return <Alert variant="error">No journeys found</Alert>;

	return (
		<FullscreenContext value={isFullscreen}>
			<Box flexDirection="column" flexGrow={1}>
				<Line dimColor>(f)ullscreen: {isFullscreen ? "on" : "off"}</Line>
				<Box flexDirection="row" gap={2} flexGrow={1}>
					<JourneyGroupExplorer
						journeyGrouping={journeyGrouping}
						groupedJourneys={groupedJourneys}
						onSelectJourneyGroup={selectJourneyGroup}
					/>
					<Summary summary={getTotalSummary(selectedGroup.journeys)} />
					<DaysInOfficePerWeekSummary
						weeklySummaries={weeklySummaries}
						currentGroupWeeks={getWeekKeys(selectedGroup.journeys)}
					/>
					<JourneyDetailPanel
						key={selectedGroup.displayName}
						journeys={selectedGroup.journeys}
					/>
				</Box>
			</Box>
		</FullscreenContext>
	);
}

export default JourneyExplorer;
