import { Text } from "ink";
import type {
	JourneyGroup,
	JourneyGrouping,
} from "../hooks/useJourneyGrouping";
import { FocusBox } from "./FocusBox";

const journeyGroupRow = (item: JourneyGroup, isSelected: boolean) => (
	<Text
		key={item.displayName}
		color={isSelected ? "green" : undefined}
		dimColor={!isSelected}
	>
		{isSelected ? ">" : " "}
		{item.displayName}
	</Text>
);

type JourneyGroupExplorerProps = {
	journeyGrouping: JourneyGrouping;
	groupedJourneys: JourneyGroup[];
	selectedJourney?: JourneyGroup;
	isFocused: boolean;
};

function JourneyGroupExplorer({
	journeyGrouping,
	groupedJourneys,
	selectedJourney,
	isFocused,
}: JourneyGroupExplorerProps) {
	return (
		<FocusBox isFocused={isFocused}>
			<Text dimColor={true}>Sor(t): {journeyGrouping}</Text>
			{groupedJourneys.map((journeyGroup) =>
				journeyGroupRow(journeyGroup, selectedJourney === journeyGroup),
			)}
		</FocusBox>
	);
}

export default JourneyGroupExplorer;
