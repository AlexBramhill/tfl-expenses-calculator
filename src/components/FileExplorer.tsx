import { Text } from "ink";
import useJourneyLookup from "../hooks/useJourneyLookup";
import type { Config } from "../repos/configRepo";
import { DaysInOfficePerWeekSummary } from "./DaysInOfficeWeeklySummary";
import { Summary } from "./Summary";

export const FileExplorer = ({
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

	if (isJourneyLookupLoading) return <Text>Loading...</Text>;
	if (journeyLookupError)
		return <Text>Error: {journeyLookupError.message}</Text>;
	return (
		<>
			<Text>{filePath}</Text>
			<Summary summary={journeyLookupResult.summary} />
			<DaysInOfficePerWeekSummary journeysResult={journeyLookupResult} />
		</>
	);
};
