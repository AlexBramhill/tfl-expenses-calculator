import { Box, Text, useWindowSize } from "ink";
import usePagination from "../hooks/usePagination";
import type { UnprocessedJourney } from "../repos/tflCsvParser";
import withFocusBoxWrapper, { type FocusProps } from "./FocusBox";
import { JourneyList } from "./JourneyList";

// TOOD: consider a more robust way to determine how many items to show per page
// e.g. by measuring the height of the header components instead of using a magic number
const MAGIC_NUMBER_FOR_HEADER_ETC = 9;

type JourneyDetailPanelProps = {
	journeys: UnprocessedJourney[];
};

type JourneyDetailPanelComponentProps = JourneyDetailPanelProps & FocusProps;

function JourneyDetailPanelComponent({
	journeys,
	isFocused,
}: JourneyDetailPanelComponentProps) {
	const { rows } = useWindowSize();
	const itemsPerPage = Math.max(1, rows - MAGIC_NUMBER_FOR_HEADER_ETC);

	const {
		currentPage,
		totalPages,
		itemsOnPage: journeysOnPage,
	} = usePagination<UnprocessedJourney>({
		items: journeys,
		itemsPerPage,
		isFocused,
	});

	return (
		<Box flexDirection="column" flexGrow={1}>
			<JourneyList journeys={journeysOnPage} allJourneys={journeys} />
			<Text dimColor>
				{currentPage + 1}/{totalPages} ↑ | ↓ to paginate
			</Text>
		</Box>
	);
}

const JourneyDetailPanel = withFocusBoxWrapper<JourneyDetailPanelProps>(
	JourneyDetailPanelComponent,
	true,
);

export default JourneyDetailPanel;
