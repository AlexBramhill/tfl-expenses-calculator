import {Box, Text, useInput} from "ink";
import useGroupedJourneys, {
	type JourneyGroup,
} from "../hooks/useGroupedJourneys";
import useJourneys from "../hooks/useJourneys";
import useListNavigation from "../hooks/useListNavigation";
import type { Config } from "../repos/configRepo";
import JourneyDetailPanel from "./JourneyDetailPanel";

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
	const { groupedJourneys , journeyGrouping, setJourneyGrouping} = useGroupedJourneys(ungroupedJourneys);
	const { selectedItem } = useListNavigation(
		groupedJourneys,
		(item) => item.displayName,
	);

	useInput((input) => {
		if (input === "t") {
			// Todo: refactor this so we have an easy list to manage state change
			setJourneyGrouping(oldValue => {
				switch (oldValue) {
					case "month":
						return "file";
					case "file":
						return "month";
				}
			})
		};
	});


	if (ungroupedJourneys.status === "loading") return <Text>Loading...</Text>;
	if (ungroupedJourneys.status === "error")
		return <Text>Error: {ungroupedJourneys.error.message}</Text>;
	if (groupedJourneys.length === 0) return <Text>No journeys found.</Text>;

	return (
		<Box flexDirection="row" gap={2} flexGrow={1}>
			<Box flexDirection="column">
				<Text dimColor={true}>Sort: {journeyGrouping}</Text>
				{groupedJourneys.map((item) =>
					journeyGroupRow(item, selectedItem === item),
				)}
			</Box>
			{selectedItem && (
				<JourneyDetailPanel
					key={selectedItem.displayName}
					journeys={selectedItem.journeys}
				/>
			)}
		</Box>
	);
};
