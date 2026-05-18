import { Box, Text } from "ink";
import type {
	ProcessedJourney,
	ProcessedJourneysResult,
} from "../repos/journeyCalculator";

export const CsvList = ({
	journeysResult,
}: {
	journeysResult: ProcessedJourneysResult;
}) => (
	<>
		<Box flexDirection={"column"}>
			<Text bold>Journey Details: </Text>
			{journeysResult.processedJourneys.map((journey) => (
				<CsvRow journeyRow={journey} key={journey.datetime.toISOString()} />
			))}
		</Box>
	</>
);

const CsvRow = ({ journeyRow }: { journeyRow: ProcessedJourney }) => {
	return (
		<Text key={journeyRow.datetime.toISOString()}>
			{journeyRow.datetime.toISOString()} |{" "}
			{journeyRow.isHomeOfficeJourney ? "yes" : "no "} |{" "}
			{journeyRow.startStation} | {journeyRow.endStation} | £
			{journeyRow.chargeAmount.toFixed(2)}
		</Text>
	);
};
