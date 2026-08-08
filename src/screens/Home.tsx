import { Text } from "ink";
import JourneyExplorer from "../components/JourneyExplorer";
import useConfig from "../hooks/useConfig";

const Home = () => {
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

export default Home;
