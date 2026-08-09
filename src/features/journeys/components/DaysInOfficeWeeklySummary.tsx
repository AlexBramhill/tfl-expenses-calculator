import { Box, Text } from "ink";
import { SpacedBox } from "@/components/SpacedBox";
import type { WeeklySummaryByDate } from "../utils/weeklyJourneySummaryCalculator";

export const DaysInOfficePerWeekSummary = ({
	weeklySummaries,
}: {
	weeklySummaries: WeeklySummaryByDate;
}) => {
	const isAnyWeekPotentiallyIncomplete = Object.entries(weeklySummaries).some(
		([_, { isPotentiallyIncomplete }]) => isPotentiallyIncomplete,
	);

	return (
		<SpacedBox>
			<Text bold>Days in office per week: </Text>
			{Object.entries(weeklySummaries).map(([dateStart, summary]) => (
				<Box key={dateStart}>
					<DaysInOfficeSummary
						dateStart={dateStart}
						daysInOffice={summary.totalDaysInOffice}
						isPotentiallyIncomplete={summary.isPotentiallyIncomplete}
					/>
				</Box>
			))}
			{isAnyWeekPotentiallyIncomplete && (
				<Text dimColor>* Week potentially incomplete</Text>
			)}
		</SpacedBox>
	);
};

const DaysInOfficeSummary = ({
	dateStart,
	daysInOffice,
	isPotentiallyIncomplete,
}: {
	dateStart: string;
	daysInOffice: number;
	isPotentiallyIncomplete: boolean;
}) => {
	const formattedDateStart = new Date(dateStart).toLocaleDateString();
	return (
		<Text>
			{isPotentiallyIncomplete ? "*" : " "} {formattedDateStart}: {daysInOffice}
		</Text>
	);
};
