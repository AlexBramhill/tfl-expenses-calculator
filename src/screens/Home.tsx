import { Text, useInput } from "ink";
import useConfig from "../hooks/useConfig";
import useCsvFiles from "../hooks/useCsvFiles";

const Home = () => {
	const {
		config,
		loading: configLoading,
		saveConfig: _saveConfig,
		error: configError,
	} = useConfig();
	const {
		files,
		loading: filesLoading,
		error: filesError,
	} = useCsvFiles(config?.csvFolder);

	return (
		<>
			<Text>Home</Text>
			<Text>Folder {config?.csvFolder}</Text>
			{configLoading && <Text>Loading config...</Text>}
			{configError && <Text>Error loading config...</Text>}
			{filesLoading && <Text>Loading files...</Text>}
			{filesError && <Text>Error loading files: {filesError.message}</Text>}
			{files.map((f) => <Text key={f}>{f}</Text>)}
		</>
	);
};

export default Home;
