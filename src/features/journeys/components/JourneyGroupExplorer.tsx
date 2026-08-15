import { Select } from "@inkjs/ui";
import { Text } from "ink";
import type {
	JourneyGroup,
	JourneyGrouping,
} from "../hooks/useJourneyGrouping";
import type { FocusProps } from "./FocusBox";
import withFocusBoxWrapper from "./withFocusBoxWrapper";

type JourneyGroupExplorerProps = {
	journeyGrouping: JourneyGrouping;
	groupedJourneys: JourneyGroup[];
	onSelectJourney: (journeyGroup: JourneyGroup) => void;
};

function JourneyGroupExplorer({
	journeyGrouping,
	groupedJourneys,
	onSelectJourney,
	isFocused,
}: JourneyGroupExplorerProps & FocusProps) {
	return (
		<>
			<Text dimColor={true}>Sor(t): {journeyGrouping}</Text>
			<Select
				key={journeyGrouping}
				isDisabled={!isFocused}
				visibleOptionCount={groupedJourneys.length}
				defaultValue={groupedJourneys[0]?.displayName}
				options={groupedJourneys.map((journeyGroup) => ({
					label: journeyGroup.displayName,
					value: journeyGroup.displayName,
				}))}
				onChange={(value) => {
					const journeyGroup = groupedJourneys.find(
						(group) => group.displayName === value,
					);
					if (journeyGroup) onSelectJourney(journeyGroup);
				}}
			/>
		</>
	);
}

export default withFocusBoxWrapper<JourneyGroupExplorerProps>(
	JourneyGroupExplorer,
	true,
);
