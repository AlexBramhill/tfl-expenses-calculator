import { Text } from "ink";
import { FileExplorerRow } from "../components/FileExplorerRow";
import useConfig from "../hooks/useConfig";
import useCsvFiles from "../hooks/useCsvFiles";

const Home = () => {
	const {
		config,
		isLoading: isConfigLoading,
		saveConfig: _saveConfig,
		error: configError,
	} = useConfig();

	const {
		filePaths,
		isLoading: isCsvFilesLoading,
		error: filesError,
	} = useCsvFiles(config?.csvFolder);

	if (isConfigLoading || isCsvFilesLoading) return <Text>Loading...</Text>;
	if (configError)
		return <Text>Error loading config: {configError.message}.</Text>;
	if (filesError) return <Text>Error loading files: {filesError.message}</Text>;

	return (
		<>
			{filePaths.map((filePath) => (
				<FileExplorerRow key={filePath} filePath={filePath} config={config} />
			))}
		</>
	);
};

export default Home;
