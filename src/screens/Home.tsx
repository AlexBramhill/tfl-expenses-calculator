import path from "node:path";
import { Text } from "ink";
import { FileExplorer } from "../components/FileExplorer";
import useConfig from "../hooks/useConfig";
import useCsvFiles from "../hooks/useCsvFiles";
import type { ProcessedJourneysResult } from "../repos/journeyCalculator";

const SummaryRow = ({
	filePath,
	journey,
}: {
	filePath: string;
	journey?: ProcessedJourneysResult;
}) => (
	<>
		<Text>{path.basename(filePath)}</Text>
		{journey && (
			<Text>
				{journey.summary.totalTrips} total trips,{" "}
				{journey.summary.totalDaysInOffice} days in office, £
				{journey.summary.totalCharge.toFixed(2)} total
			</Text>
		)}
		{journey?.processedJourneys.map((j) => (
			<Text key={j.datetime.toISOString()}>
				{j.datetime.toISOString()} | {j.isHomeOfficeJourney ? "yes" : "no "} |{" "}
				{j.startStation} | {j.endStation} | £{j.chargeAmount.toFixed(2)}
			</Text>
		))}
	</>
);

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
				<FileExplorer key={filePath} filePath={filePath} config={config} />
			))}
		</>
	);
};

export default Home;
