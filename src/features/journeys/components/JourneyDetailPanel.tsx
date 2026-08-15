import type { Journey } from "@/features/journeys";
import useFocusBox from "../hooks/useFocusBox";
import { FocusBox } from "./FocusBox";
import { JourneyList } from "./JourneyList";

type JourneyDetailPanelProps = {
	journeys: Journey[];
};

function JourneyDetailPanel({ journeys }: JourneyDetailPanelProps) {
	const isFocused = useFocusBox(true);

	return (
		<FocusBox isFocused={isFocused}>
			<JourneyList journeys={journeys} isFocused={isFocused} />
		</FocusBox>
	);
}

export default JourneyDetailPanel;
