import { Select } from "@inkjs/ui";
import { Line } from "@/components/Line";
import { FocusBox } from "@/features/journeys/components/FocusBox";
import useFocusBox from "@/features/journeys/hooks/useFocusBox";
import type {
	JourneyGroup,
	JourneyGrouping,
} from "@/features/journeys/utils/journeyGrouping";

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
	const { isFocused } = useFocusBox(true);

	return (
		<FocusBox isFocused={isFocused} minWidth={17}>
			<Line dimColor>Sor(t): {journeyGrouping}</Line>
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
