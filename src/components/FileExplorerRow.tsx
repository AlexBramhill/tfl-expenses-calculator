import path from "node:path";
import { Box, Text } from "ink";
import { useState } from "react";
import useJourneyLookup from "../hooks/useJourneyLookup";
import type { Config } from "../repos/configRepo";
import { CsvList } from "./CsvList";
import { DaysInOfficePerWeekSummary } from "./DaysInOfficeWeeklySummary";
import { Summary } from "./Summary";

export const FileExplorerRow = ({
	filePath,
	config,
}: {
	filePath: string;
	config: Config;
}) => {
	const {
		journeyLookupResult,
		isLoading: isJourneyLookupLoading,
		error: journeyLookupError,
	} = useJourneyLookup({
		filePath: filePath,
		homeStations: config?.homeStations ?? [],
		officeStations: config?.officeStations ?? [],
		ignoreWeekends: config?.ignoreWeekends,
	});

	const [shouldShowSummary, setShouldShowSummary] = useState(true);
	const [shouldShowJourneys, setShouldShowJourneys] = useState(true);

	if (isJourneyLookupLoading) return <Text>Loading...</Text>;
	if (journeyLookupError)
		return <Text>Error: {journeyLookupError.message}</Text>;
	return (
		<>
			<Text bold underline>
				{path.basename(filePath)}
			</Text>
			{shouldShowSummary && (
				<>
					<Box paddingLeft={2} paddingBottom={1}>
						<Summary summary={journeyLookupResult.summary} />
					</Box>
					<Box paddingLeft={2}>
						<DaysInOfficePerWeekSummary journeysResult={journeyLookupResult} />
					</Box>
				</>
			)}
			{shouldShowJourneys && (
				<Box flexGrow={0} paddingTop={1} paddingLeft={4}>
					<CsvList journeysResult={journeyLookupResult} />
				</Box>
			)}
		</>
	);
};
