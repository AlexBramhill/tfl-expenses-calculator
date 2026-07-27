import path from "node:path";
import { Box, Text } from "ink";
import { useState } from "react";
import useGroupedJourneys, {
	type JourneyGrouping,
} from "../hooks/UseGroupedJourneys";
import useCsvsData from "../hooks/useCsvsData";
import type { Config } from "../repos/configRepo";
import { FileDetailPanels } from "./FileDetailPanels";

export const JourneyExplorer = ({ config }: { config: Config }) => {
	const csvDataState = useCsvsData(config.csvFolder);
	const [journeySort, _SetJourneySort] = useState<JourneyGrouping>("month");
	const sortedItems = useGroupedJourneys(csvDataState, journeySort);

	if (csvDataState.status === "loading") return <Text>Loading...</Text>;
	if (csvDataState.status === "error")
		return <Text>Error: {csvDataState.error.message}</Text>;

	return (
        <Box flexDirection="row" gap={2} flexGrow={1}>
            <Box flexDirection="column">
                {sortedItems.map((item) => {
					return (
						<Text
						key={item.sortValue}>
						item.displayName
						</Text>
					)
	                }
				)}
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
