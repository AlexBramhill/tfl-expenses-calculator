import type { Journey } from "@/features/journeys";
import { FocusBox } from "@/features/journeys/components/FocusBox";
import { JourneyTable } from "@/features/journeys/components/JourneyTable";
import useFocusBox from "@/features/journeys/hooks/useFocusBox";

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
