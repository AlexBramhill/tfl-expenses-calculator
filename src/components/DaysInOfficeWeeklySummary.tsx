import { Box, Text } from "ink";
import type { Journey } from "../repos/journeyCalculator2";
import { getWeeklySummaries } from "../repos/weeklyJourneySummaryCalculator";

export const DaysInOfficePerWeekSummary = ({
	selectedJourney,
	isIncludingWeekends,
}: {
	selectedJourney: Journey[];
	isIncludingWeekends: boolean;
}) => {
	const weeklySummaries = getWeeklySummaries(
		selectedJourney,
		isIncludingWeekends,
	);

	const isAnyWeekPotentiallyIncomplete = Object.entries(weeklySummaries).some(
		([_, { isPotentiallyIncomplete }]) => isPotentiallyIncomplete,
	);

	return (
		<Box flexDirection="column">
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
		</Box>
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
