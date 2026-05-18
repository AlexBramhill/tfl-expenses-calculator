import { Text } from "ink";
import { FileExplorerRow } from "../components/FileExplorerRow";
import useConfig from "../hooks/useConfig";
import useCsvFiles from "../hooks/useCsvFiles";
import useFileNavigation from "../hooks/useFileNavigation";

const Home = () => {
	const {
		config,
		isLoading: isConfigLoading,
		saveConfig: _saveConfig,
		error: configError,
	} = useConfig();

	const csvFilesResult = useCsvFiles(config?.csvFolder);

	const { currentSelectedFile, isSummaryVisible } =
		useFileNavigation(csvFilesResult);

	if (isConfigLoading || csvFilesResult.isLoading)
		return <Text>Loading...</Text>;
	if (configError)
		return <Text>Error loading config: {configError.message}.</Text>;
	if (csvFilesResult.error)
		return <Text>Error loading files: {csvFilesResult.error.message}</Text>;

	return (
		<>
			{csvFilesResult.filePaths.map((filePath) => (
				<FileExplorerRow
					key={filePath}
					filePath={filePath}
					config={config}
					isCurrentSelectedFile={currentSelectedFile === filePath}
					shouldShowSummary={isSummaryVisible(filePath)}
				/>
			))}
		</>
	);
};

export default Home;
