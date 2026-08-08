import { Text } from "ink";
import { useConfig } from "@/features/config";
import { JourneyExplorer } from "@/features/journeys";

const HomeScreen = () => {
	const { config, isLoading, error } = useConfig();

	if (isLoading) return <Text>Loading...</Text>;
	if (error) return <Text>Error loading config: {error.message}.</Text>;

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
