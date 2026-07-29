import { Box, Text } from "ink";
import useGroupedJourneys, {
	type JourneyGroup,
} from "../hooks/useGroupedJourneys";
import useJourneys from "../hooks/useJourneys";
import useListNavigation from "../hooks/useListNavigation";
import type { Config } from "../repos/configRepo";

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

export const JourneyExplorer = ({ config }: { config: Config }) => {
	const ungroupedJourneys = useJourneys(config.csvFolder);
	const { groupedJourneys } = useGroupedJourneys(ungroupedJourneys);
	const { selectedItem } = useListNavigation(
		groupedJourneys,
		(item) => item.displayName,
	);

	if (ungroupedJourneys.status === "loading") return <Text>Loading...</Text>;
	if (ungroupedJourneys.status === "error")
		return <Text>Error: {ungroupedJourneys.error.message}</Text>;
	if (groupedJourneys.length === 0) return <Text>No journeys found.</Text>;

	return (
		<Box flexDirection="row" gap={2} flexGrow={1}>
			<Box flexDirection="column">
				{groupedJourneys.map((item) =>
					journeyGroupRow(item, selectedItem === item),
				)}
			</Box>
			{/*{currentSelectedFile &&*/}
			{/*    selectedResult &&*/}
			{/*    !(selectedResult instanceof Error) && (*/}
			{/*        <FileDetailPanels*/}
			{/*            key={currentSelectedFile}*/}
			{/*            journeysResult={selectedResult}*/}
			{/*        />*/}
			{/*    )}*/}
		</Box>
	);
};
