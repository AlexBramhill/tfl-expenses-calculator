import { Text, useInput } from "ink";
import useConfig from "../hooks/useConfig";
import useCsvFiles from "../hooks/useCsvFiles";
import useJourneyLookups from "../hooks/useJourneyLookups";
import type { ProcessedJourneysSummary } from "../repos/journeyCalculator";

const SummaryRow = ({
	file,
	summary,
}: {
	file: string;
	summary?: ProcessedJourneysSummary;
}) => (
	<>
		<Text>{file}</Text>
		{summary && (
			<Text>
				{summary.totalTrips} total trips,
				{summary.totalDaysInOffice} days in office, £{summary.totalCharge} total
			</Text>
		)}
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
		files,
		loading: filesLoading,
		error: filesError,
	} = useCsvFiles(config?.csvFolder);

	const { journeyLookups } = useJourneyLookups({
		files,
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
			{files.map((f) => (
				<SummaryRow key={f} file={f} summary={journeyLookups[f]?.summary} />
			))}
		</>
	);
};

export default Home;
