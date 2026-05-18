import { Text } from "ink";
import type { ProcessedJourneysSummary } from "../repos/journeyCalculator";

export const Summary = ({ summary }: { summary: ProcessedJourneysSummary }) => {
	return (
		<Text>
			{summary.totalTrips} total trips{"\n"}
			{summary.totalDaysInOffice} days in office{"\n"}£
			{summary.totalCharge.toFixed(2)} total
		</Text>
	);
};
