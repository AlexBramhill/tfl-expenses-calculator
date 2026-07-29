import { Box, Text } from "ink";
import useGroupedJourneys from "../hooks/useGroupedJourneys";
import useJourneys from "../hooks/useJourneys";
import useListNavigation from "../hooks/useListNavigation";
import type { Config } from "../repos/configRepo";

export const JourneyExplorer = ({ config }: { config: Config }) => {
	const unsortedJourneys = useJourneys(config.csvFolder);
	const {groupedJourneys, journeyGrouping, setJourneyGrouping} = useGroupedJourneys(unsortedJourneys);
	const { currentItem } = useListNavigation(
		groupedJourneys,
		(item) => item.displayName,
	);

	if (unsortedJourneys.status === "loading") return <Text>Loading...</Text>;
	if (unsortedJourneys.status === "error")
		return <Text>Error: {unsortedJourneys.error.message}</Text>;
	if (groupedJourneys.length === 0) return <Text>No journeys found.</Text>;

	return (
		<Box flexDirection="row" gap={2} flexGrow={1}>
			<Box flexDirection="column">
				{groupedJourneys.map((item) => {
					return (
						<Text
							key={item.displayName}
							color={
								currentItem?.displayName === item.displayName
									? "green"
									: undefined
							}
							dimColor={currentItem?.displayName !== item.displayName}
						>
							{item.displayName}
						</Text>
					);
				})}
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
