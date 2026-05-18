import { Box, Text } from "ink";
import type { ProcessedJourneysSummary } from "../repos/journeyCalculator";

export const Summary = ({ summary }: { summary: ProcessedJourneysSummary }) => {
	return (
		<Box flexDirection={"column"}>
			<Text bold>Summary:</Text>
			<Text>
				{summary.totalTrips} total trips{"\n"}
				{summary.totalDaysInOffice} days in office{"\n"}£
				{summary.totalCharge.toFixed(2)} total
			</Text>
		</Box>
	);
};
