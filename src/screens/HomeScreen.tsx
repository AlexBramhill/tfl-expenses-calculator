import { Text } from "ink";
import type { Config } from "@/api/configRepo";
import { JourneyExplorer } from "@/features/journeys";

const HomeScreen = ({
	config,
	saveConfig,
}: {
	config: Config;
	saveConfig: (config: Config) => void;
}) => {
	return (
		<>
			<Text bold underline>
				Home
			</Text>
			<JourneyExplorer config={config} saveConfig={saveConfig} />
		</>
	);
};

export default HomeScreen;
