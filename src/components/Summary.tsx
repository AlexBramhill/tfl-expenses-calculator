import { Text } from "ink";
import type { ProcessedJourneysSummary } from "../repos/journeyCalculator";

export const Summary = (summary: ProcessedJourneysSummary) => {
	<Text>
		{summary.totalTrips} total trips <br />
		{summary.totalDaysInOffice} days in office <br />£
		{summary.totalCharge.toFixed(2)} total
	</Text>;
};
