import { Text } from "ink";
import { SpacedBox } from "@/components/SpacedBox";
import type { JourneySummaryTotals } from "../utils/journeySummaryCalculator";

export const Summary = ({ summary }: { summary: JourneySummaryTotals }) => {
	return (
		<SpacedBox>
			<Text bold>Summary:</Text>
			<Text>
				{summary.totalTrips} total trips{"\n"}
				{summary.totalDaysInOffice} days in office{"\n"}£
				{summary.totalCharge.toFixed(2)} total
			</Text>
		</SpacedBox>
	);
};
