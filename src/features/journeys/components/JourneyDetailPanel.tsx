import { useWindowSize } from "ink";
import type { Journey } from "../utils/journeyCalculator";
import withFocusBoxWrapper, { type FocusProps } from "./FocusBox";
import { JourneyList } from "./JourneyList";
import Pagination from "./Pagination";

// TOOD: consider a more robust way to determine how many items to show per page
// e.g. by measuring the height of the header components instead of using a magic number
const MAGIC_NUMBER_FOR_HEADER_ETC = 15;

type JourneyDetailPanelProps = {
	journeys: Journey[];
};

type JourneyDetailPanelComponentProps = JourneyDetailPanelProps & FocusProps;

function JourneyDetailPanelComponent({
	journeys,
	isFocused,
}: JourneyDetailPanelComponentProps) {
	const { rows } = useWindowSize();
	const itemsPerPage = Math.max(1, rows - MAGIC_NUMBER_FOR_HEADER_ETC);

	return (
		<Pagination
			items={journeys}
			itemsPerPage={itemsPerPage}
			isFocused={isFocused}
		>
			{(journeysOnPage) => (
				<JourneyList journeys={journeysOnPage} allJourneys={journeys} />
			)}
		</Pagination>
	);
}

const JourneyDetailPanel = withFocusBoxWrapper<JourneyDetailPanelProps>(
	JourneyDetailPanelComponent,
	true,
);

export default JourneyDetailPanel;
