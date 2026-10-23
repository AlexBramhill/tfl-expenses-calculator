import { Select } from "@inkjs/ui";
import { Text } from "ink";
import useFocusBox from "../hooks/useFocusBox";
import type { JourneyGroup, JourneyGrouping } from "../utils/journeyGrouping";
import { FocusBox } from "./FocusBox";

type JourneyGroupExplorerProps = {
	journeyGrouping: JourneyGrouping;
	groupedJourneys: JourneyGroup[];
	onSelectJourneyGroup: (journeyGroupName: string) => void;
};

function JourneyGroupExplorer({
	journeyGrouping,
	groupedJourneys,
	onSelectJourneyGroup,
}: JourneyGroupExplorerProps) {
	const isFocused = useFocusBox(true);

	return (
		<FocusBox isFocused={isFocused}>
			<Text dimColor>Sor(t): {journeyGrouping}</Text>
			<Select
				key={journeyGrouping}
				isDisabled={!isFocused}
				visibleOptionCount={groupedJourneys.length}
				defaultValue={groupedJourneys[0]?.displayName}
				options={groupedJourneys.map((journeyGroup) => ({
					label: journeyGroup.displayName,
					value: journeyGroup.displayName,
				}))}
				onChange={onSelectJourneyGroup}
			/>
		</FocusBox>
	);
}

export default JourneyGroupExplorer;
