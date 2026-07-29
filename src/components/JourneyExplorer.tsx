import {Box, Text} from "ink";
import useGroupedJourneys, {type JourneyGroup} from "../hooks/useGroupedJourneys";
import useJourneys from "../hooks/useJourneys";
import useListNavigation from "../hooks/useListNavigation";
import type {Config} from "../repos/configRepo";

const journeyGroupRow = (item: JourneyGroup) => {
    const isSelected = item?.displayName === item.displayName
    return (
        <Text
            key={item.displayName}
            color={
                isSelected
                    ? "green"
                    : undefined
            }
            dimColor={!isSelected}
        >
            {isSelected ? ">" : " "}{item.displayName}
        </Text>
    );
}

export const JourneyExplorer = ({config}: { config: Config }) => {
    const unsortedJourneys = useJourneys(config.csvFolder);
    const {groupedJourneys, journeyGrouping, setJourneyGrouping} = useGroupedJourneys(unsortedJourneys);
    const {currentItem} = useListNavigation(
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
                {groupedJourneys.map(journeyGroupRow)}
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
