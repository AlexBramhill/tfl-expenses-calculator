import { Box, Text, useWindowSize } from "ink";
import useJourneyLookup from "../hooks/useJourneyLookup";
import usePagination from "../hooks/usePagination";
import type { Config } from "../repos/configRepo";
import type { ProcessedJourney } from "../repos/journeyCalculator";
import { CsvList } from "./CsvList";
import { DaysInOfficePerWeekSummary } from "./DaysInOfficeWeeklySummary";
import { Summary } from "./Summary";

// TOOD: consider a more robust way to determine how many items to show per page
// e.g. by measuring the height of the header components instead of using a magic number
const MAGIC_NUMBER_FOR_HEADER_ETC = 9;

export const FileDetailPanels = ({
	filePath,
	config,
}: {
	filePath: string;
	config: Config;
}) => {
	const { journeyLookupResult, isLoading, error } = useJourneyLookup({
		filePath,
		homeStations: config.homeStations ?? [],
		officeStations: config.officeStations ?? [],
		ignoreWeekends: config.ignoreWeekends,
	});

	const { rows } = useWindowSize();
	const itemsPerPage = Math.max(1, rows - MAGIC_NUMBER_FOR_HEADER_ETC);

	const journeys = [...(journeyLookupResult?.processedJourneys ?? [])].sort(
		(a, b) => a.datetime.getTime() - b.datetime.getTime(),
	);

	const {
		currentPage,
		totalPages,
		itemsOnPage: journeysOnPage,
	} = usePagination<ProcessedJourney>({
		items: journeys,
		itemsPerPage,
	});

	if (isLoading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;

	return (
		<>
			<Box flexDirection="column" gap={1}>
				<Summary summary={journeyLookupResult.summary} />
				<DaysInOfficePerWeekSummary journeysResult={journeyLookupResult} />
			</Box>
			<Box flexDirection="column">
				<CsvList journeys={journeysOnPage} />
				<Text dimColor>
					{currentPage + 1}/{totalPages} | ← → to paginate
				</Text>
			</Box>
		</>
	);
};
