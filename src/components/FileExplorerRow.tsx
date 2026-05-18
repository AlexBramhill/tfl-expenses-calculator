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
	isCurrentSelectedFile,
	shouldShowSummary,
}: {
	filePath: string;
	config: Config;
	isCurrentSelectedFile: boolean;
	shouldShowSummary: boolean;
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

	const [shouldShowJourneys, setShouldShowJourneys] = useState(false);

	if (isJourneyLookupLoading) return <Text>Loading...</Text>;
	if (journeyLookupError)
		return <Text>Error: {journeyLookupError.message}</Text>;

	return (
		<>
			<Text bold color={isCurrentSelectedFile ? "green" : "black"}>
				{isCurrentSelectedFile ? "> " : "  "}
				<Text underline>{path.basename(filePath)}</Text>
			</Text>
			{shouldShowSummary && (
				<>
					<Box paddingLeft={2} paddingBottom={1}>
						<Summary summary={journeyLookupResult.summary} />
					</Box>
					<Box paddingLeft={2} paddingBottom={1}>
						<DaysInOfficePerWeekSummary journeysResult={journeyLookupResult} />
					</Box>
				</>
			)}
			{shouldShowJourneys && (
				<Box flexGrow={0} paddingLeft={4} paddingBottom={1}>
					<CsvList journeysResult={journeyLookupResult} />
				</Box>
			)}
		</>
	);
};
