import { Box, Text } from "ink";
import { CONFIG_PATH, DEFAULT_CONFIG } from "../repos/configRepo";

const EXAMPLE_CONFIG = JSON.stringify(
	{
		csvFolder: DEFAULT_CONFIG.csvFolder,
		homeStations: ["Tottenham Court Road"],
		officeStations: ["Euston [London Underground]"],
		ignoreWeekends: true,
	},
	null,
	2,
);

const Help = () => (
	<Box flexDirection="column" gap={1}>
		<Box flexDirection="column">
			<Text bold underline>
				Getting started
			</Text>
			<Text>
				Edit the config found here: <Text color="yellow">{CONFIG_PATH}</Text>{" "}
				adding all home/office stations{" "}
			</Text>
		</Box>

		<Box flexDirection="column">
			<Text bold underline>
				Example config
			</Text>
			{EXAMPLE_CONFIG.split("\n").map((l, _i) => (
				<Text color="yellow" key={l}>
					{l}
				</Text>
			))}
		</Box>
	</Box>
);

export default Help;
