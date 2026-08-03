import { Box, Text, useWindowSize } from "ink";
import usePagination from "../hooks/usePagination";
import type { Journey } from "../repos/tflCsvParser";
import withFocusBoxWrapper from "./FocusBox";
import { JourneyList } from "./JourneyList";

// TOOD: consider a more robust way to determine how many items to show per page
// e.g. by measuring the height of the header components instead of using a magic number
const MAGIC_NUMBER_FOR_HEADER_ETC = 9;

function JourneyDetailPanelComponent({
	journeys,
	isFocused,
}: {
	journeys: Journey[];
	isFocused?: boolean;
}) {
	const { rows } = useWindowSize();
	const itemsPerPage = Math.max(1, rows - MAGIC_NUMBER_FOR_HEADER_ETC);

	const {
		currentPage,
		totalPages,
		itemsOnPage: journeysOnPage,
	} = usePagination<Journey>({
		items: journeys,
		itemsPerPage,
	});

	return (
		<Box flexDirection="column" padding={1} flexGrow={1}>
			<JourneyList journeys={journeysOnPage} allJourneys={journeys} />
			<Text dimColor>
				{currentPage + 1}/{totalPages} ↑ | ↓ to paginate
			</Text>
		</Box>
	);
}

const JourneyDetailPanel = withFocusBoxWrapper(
	JourneyDetailPanelComponent,
	true,
);

export default JourneyDetailPanel;
