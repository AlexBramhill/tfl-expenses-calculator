import { Box, Text } from "ink";
import type { ProcessedJourney } from "../repos/journeyCalculator";

export const CsvList = ({ journeys }: { journeys: ProcessedJourney[] }) => (
	<Box flexDirection="column">
		<Text bold>Journey Details:</Text>
		{journeys.map((journey) => (
			<CsvRow journeyRow={journey} key={journey.datetime.toISOString()} />
		))}
	</Box>
);

const CsvRow = ({ journeyRow }: { journeyRow: ProcessedJourney }) => (
	<Text color={journeyRow.isHomeOfficeJourney ? "green" : "grey"}>
		{journeyRow.datetime.toLocaleString("en-GB", {
			weekday: "short",
			year: "2-digit",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		})}{" "}
		| {journeyRow.isHomeOfficeJourney ? "yes" : "no "} |{" "}
		{journeyRow.startStation} | {journeyRow.endStation} | £
		{journeyRow.chargeAmount.toFixed(2)}
	</Text>
);
