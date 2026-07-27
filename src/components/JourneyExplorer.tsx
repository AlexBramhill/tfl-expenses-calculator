import {Box, Text} from "ink";
import {useMemo, useState} from "react";
import useGroupedJourneys, {type JourneyGroup, type JourneyGrouping,} from "../hooks/UseGroupedJourneys";
import useCsvsData from "../hooks/useCsvsData";
import type {Config} from "../repos/configRepo";
import {FileDetailPanels} from "./FileDetailPanels";

function useSelectJourneyGroup(journeyGroups: JourneyGroup[]) {
    const [currentJourneyGroupDisplayName, setCurrentJourneyGroupDisplayName] = useState<string>();

    const currentSelectedJourneyGroup = useMemo(() => {
        if (journeyGroups.length === 0) {
            return undefined;
        }
        const currentIndex = journeyGroups.findIndex(x => x.displayName === currentJourneyGroupDisplayName)
        if (currentIndex === -1) {
            return journeyGroups[0];
        }
        return journeyGroups[currentIndex]
    }, [journeyGroups, currentJourneyGroupDisplayName]);

    const getNextJourneyGroup = () => {
        if (journeyGroups.length === 0) return;

        setCurrentJourneyGroupDisplayName(oldName => {
            const currentIndex = journeyGroups.findIndex(x => x.displayName === oldName)
            const nextIndex = (currentIndex + 1) % journeyGroups.length
            return journeyGroups[nextIndex].displayName
        })
    };

    const getPreviousJourneyGroup = () => {
        if (journeyGroups.length === 0) return;

        setCurrentJourneyGroupDisplayName(oldName => {
            const foundIndex = journeyGroups.findIndex(x => x.displayName === oldName)
            const currentIndex = foundIndex === -1 ? 0 : foundIndex;
            const previousIndex = (currentIndex - 1 + journeyGroups.length) % journeyGroups.length
            return journeyGroups[previousIndex].displayName
        })
    };

    return {
        currentSelectedJourneyGroup,
        getNextJourneyGroup,
        getPreviousJourneyGroup,
    };
}

export const JourneyExplorer = ({config}: { config: Config }) => {
    const csvDataState = useCsvsData(config.csvFolder);
    const [journeySort, _SetJourneySort] = useState<JourneyGrouping>("month");
    const sortedItems = useGroupedJourneys(csvDataState, journeySort);
    const {
        currentSelectedJourneyGroup,
        getNextJourneyGroup,
        getPreviousJourneyGroup,
    } = useSelectJourneyGroup(sortedItems);
    if (csvDataState.status === "loading") return <Text>Loading...</Text>;
    if (csvDataState.status === "error")
        return <Text>Error: {csvDataState.error.message}</Text>;
    if (sortedItems.length === 0) return <Text>No journeys found.</Text>;

    return (
        <Box flexDirection="row" gap={2} flexGrow={1}>
            <Box flexDirection="column">
                {sortedItems.map((item) => {
                    return (
                        <Text
                            key={item.displayName}
                            color={currentSelectedJourneyGroup?.displayName === item.displayName ? 'green' : undefined}
                            dimColor={
                                currentSelectedJourneyGroup?.displayName !== item.displayName
                            }
                        >
                            {item.displayName}
                        </Text>
                    );
                })}
            </Box>
            {currentSelectedFile &&
                selectedResult &&
                !(selectedResult instanceof Error) && (
                    <FileDetailPanels
                        key={currentSelectedFile}
                        journeysResult={selectedResult}
                    />
                )}
        </Box>
    );
};
