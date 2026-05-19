import { Box, Text } from "ink";
import type { WeeklySummaryByDate } from "../repos/journeyCalculator";

export const DaysInOfficePerWeekSummary = ({
	weeklySummaries,
}: {
	weeklySummaries: WeeklySummaryByDate;
}) => {
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
	const formattedDateStart = new Date(dateStart).toLocaleDateString();
	return (
		<Text>
			{formattedDateStart}: {daysInOffice}
		</Text>
	);
};
