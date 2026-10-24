import type { Journey } from "@/features/journeys";
import useFocusBox from "../hooks/useFocusBox";
import { FocusBox } from "./FocusBox";
import { JourneyTable } from "./JourneyTable";

type JourneyDetailPanelProps = {
	journeys: Journey[];
	isJourneyOpen: boolean;
	onSelectJourney: (journey: Journey) => void;
};

function JourneyDetailPanel({
	journeys,
	isJourneyOpen,
	onSelectJourney,
}: JourneyDetailPanelProps) {
	const { isFocused } = useFocusBox(true);
	const isCurrentPanel = isFocused || isJourneyOpen;

	return (
		<FocusBox isFocused={isCurrentPanel} canGrow>
			<JourneyTable
				journeys={journeys}
				isFocused={isFocused}
				isSelectionVisible={isCurrentPanel}
				onSelectJourney={onSelectJourney}
			/>
		</FocusBox>
	);
}

export default JourneyDetailPanel;
