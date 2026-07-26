import { Box, Text } from "ink";
import type { WeeklySummaryByDate } from "../repos/journeyCalculator";

export const DaysInOfficePerWeekSummary = ({
	weeklySummaries,
}: {
	weeklySummaries: WeeklySummaryByDate;
}) => {
	const isAnyWeekCrossingMonth = Object.keys(weeklySummaries).some(isWeekCrossingMonth);

	return (
		<Box flexDirection="column">
			<Text bold>Days in office per week: </Text>
			{Object.entries(weeklySummaries).map(([dateStart, summary]) => (
				<Box key={dateStart}>
					<DaysInOfficeSummary
						dateStart={dateStart}
						daysInOffice={summary.totalDaysInOffice}
					/>
				</Box>
			))}
			{isAnyWeekCrossingMonth && (
				<Text dimColor>
					* Week not entirely in current month,{"\n  "}weekly summary may be
					incomplete
				</Text>
			)}
		</Box>
	);
};

const DaysInOfficeSummary = ({
	dateStart,
	daysInOffice,
}: {
	dateStart: string;
	daysInOffice: number;
}) => {
	const crossesMonth = isWeekCrossingMonth(dateStart);
	const formattedDateStart = new Date(dateStart).toLocaleDateString();
	return (
		<Text>
			{crossesMonth ? "*" : " "} {formattedDateStart}: {daysInOffice}
		</Text>
	);
};

const isWeekCrossingMonth = (dateStart: string): boolean => {
	const start = new Date(dateStart);
	const end = new Date(start);
	end.setDate(end.getDate() + 6);
	return start.getMonth() !== end.getMonth();
};
