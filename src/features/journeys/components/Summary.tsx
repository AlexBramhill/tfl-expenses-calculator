import { Line } from "@/components/Line";
import { FocusBox } from "@/features/journeys/components/FocusBox";
import useFocusBox from "@/features/journeys/hooks/useFocusBox";
import type { JourneySummaryTotals } from "../utils/journeySummaryCalculator";

export const Summary = ({ summary }: { summary: JourneySummaryTotals }) => {
	const isFocused = useFocusBox();

	return (
		<FocusBox isFocused={isFocused} minWidth={22}>
			<Line bold>Summary:</Line>
			<Line>{summary.totalTrips} total trips</Line>
			<Line>{summary.totalDaysInOffice} days in office</Line>
			<Line>£{summary.totalCharge.toFixed(2)} total</Line>
		</FocusBox>
	);
};
