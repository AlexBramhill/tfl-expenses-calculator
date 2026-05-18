import path from "node:path";
import { Text } from "ink";
import useConfig from "../hooks/useConfig";
import useCsvFiles from "../hooks/useCsvFiles";
import useJourneyLookups from "../hooks/useJourneyLookups";
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
		loading: configLoading,
		saveConfig: _saveConfig,
		error: configError,
	} = useConfig();

	const {
		filePaths,
		loading: filesLoading,
		error: filesError,
	} = useCsvFiles(config?.csvFolder);

	const { journeyLookups } = useJourneyLookups({
		files: filePaths,
		homeStations: config?.homeStations ?? [],
		officeStations: config?.officeStations ?? [],
		ignoreWeekends: config?.ignoreWeekends,
	});

	return (
		<>
			<Text>Home</Text>
			<Text>Folder {config?.csvFolder}</Text>
			{configLoading && <Text>Loading config...</Text>}
			{configError && <Text>Error loading config...</Text>}
			{filesLoading && <Text>Loading files...</Text>}
			{filesError && <Text>Error loading files: {filesError.message}</Text>}
			{filePaths.map((filePath) => (
				<SummaryRow
					key={filePath}
					filePath={filePath}
					journey={journeyLookups[filePath]}
				/>
			))}
		</>
	);
};

export default Home;
