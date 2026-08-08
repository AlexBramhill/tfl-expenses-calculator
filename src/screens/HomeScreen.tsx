import { Text } from "ink";
import type { Config } from "@/api/configRepo";
import { JourneyExplorer } from "@/features/journeys";

const HomeScreen = ({ config }: { config: Config }) => {
	return (
		<>
			<Text bold underline>
				Home
			</Text>
			<JourneyExplorer config={config} />
		</>
	);
};

export default HomeScreen;
