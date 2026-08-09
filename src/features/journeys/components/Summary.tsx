import { Text } from "ink";
import { DimBox } from "@/components/DimBox";
import type { JourneySummaryTotals } from "../utils/journeySummaryCalculator";

export const Summary = ({ summary }: { summary: JourneySummaryTotals }) => {
	return (
		<DimBox>
			<Text bold>Summary:</Text>
			<Text>
				{summary.totalTrips} total trips{"\n"}
				{summary.totalDaysInOffice} days in office{"\n"}£
				{summary.totalCharge.toFixed(2)} total
			</Text>
		</DimBox>
	);
};
