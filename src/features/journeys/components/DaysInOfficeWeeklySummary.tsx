import { Box, Text } from "ink";
import Pagination from "@/components/Pagination";
import useFocusBox from "../hooks/useFocusBox";
import type { WeeklySummaryByDate } from "../utils/weeklyJourneySummaryCalculator";
import { FocusBox } from "./FocusBox";

export const DaysInOfficePerWeekSummary = ({
	weeklySummaries,
	currentGroupWeeks,
}: {
	weeklySummaries: WeeklySummaryByDate;
	currentGroupWeeks: Set<string>;
}) => {
	const isFocused = useFocusBox();
	const weeklyEntries = Object.entries(weeklySummaries)
		.filter(([dateStart]) => currentGroupWeeks.has(dateStart))
		.sort(([a], [b]) => a.localeCompare(b));
	const isAnyWeekPotentiallyIncomplete = weeklyEntries.some(
		([, { isPotentiallyIncomplete }]) => isPotentiallyIncomplete,
	);

	return (
		<FocusBox isFocused={isFocused}>
			<Text bold>Days in office per week: </Text>
			{isAnyWeekPotentiallyIncomplete && (
				<Text dimColor>* Week potentially incomplete</Text>
			)}
			<Pagination items={weeklyEntries} isFocused={isFocused}>
				{(entriesOnPage) => (
					<>
						{entriesOnPage.map(([dateStart, summary]) => (
							<Box key={dateStart}>
								<DaysInOfficeSummary
									dateStart={dateStart}
									daysInOffice={summary.totalDaysInOffice}
									isPotentiallyIncomplete={summary.isPotentiallyIncomplete}
								/>
							</Box>
						))}
					</>
				)}
			</Pagination>
		</FocusBox>
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
	const formattedDateStart = new Date(dateStart).toLocaleDateString("en-GB");
	return (
		<Text>
			{isPotentiallyIncomplete ? "*" : " "} {formattedDateStart}: {daysInOffice}
		</Text>
	);
};
