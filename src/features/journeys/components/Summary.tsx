import { Text } from "ink";
import { FocusBox } from "@/features/journeys/components/FocusBox";
import useFocusBox from "@/features/journeys/hooks/useFocusBox";
import type { JourneySummaryTotals } from "../utils/journeySummaryCalculator";

export const Summary = ({ summary }: { summary: JourneySummaryTotals }) => {
	const isFocused = useFocusBox();

	return (
		<FocusBox isFocused={isFocused}>
			<Text bold>Summary:</Text>
			<Text>
				{summary.totalTrips} total trips{"\n"}
				{summary.totalDaysInOffice} days in office{"\n"}£
				{summary.totalCharge.toFixed(2)} total
			</Text>
		</FocusBox>
	);
};
