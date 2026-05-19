import { Box, Text, useWindowSize } from "ink";
import usePagination from "../hooks/usePagination";
import type {
	ProcessedJourney,
	ProcessedJourneysResult,
} from "../repos/journeyCalculator";
import { CsvList } from "./CsvList";
import { DaysInOfficePerWeekSummary } from "./DaysInOfficeWeeklySummary";
import { Summary } from "./Summary";

// TOOD: consider a more robust way to determine how many items to show per page
// e.g. by measuring the height of the header components instead of using a magic number
const MAGIC_NUMBER_FOR_HEADER_ETC = 9;

export const FileDetailPanels = ({
	journeysResult,
}: {
	journeysResult: ProcessedJourneysResult;
}) => {
	const { rows } = useWindowSize();
	const itemsPerPage = Math.max(1, rows - MAGIC_NUMBER_FOR_HEADER_ETC);

	const journeys = [...journeysResult.processedJourneys].sort(
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

	return (
		<>
			<Box flexDirection="column" gap={1}>
				<Summary summary={journeysResult.summary} />
				<DaysInOfficePerWeekSummary
					weeklySummaries={journeysResult.weeklySummaries}
				/>
			</Box>
			<Box flexDirection="column">
				<CsvList journeys={journeysOnPage} allJourneys={journeys} />
				<Text dimColor>
					{currentPage + 1}/{totalPages} | ← → to paginate
				</Text>
			</Box>
		</>
	);
};
