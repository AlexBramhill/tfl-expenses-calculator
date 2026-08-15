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
	const weeklyEntries = Object.entries(weeklySummaries).sort(([a], [b]) =>
		b.localeCompare(a),
	);
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
									isInCurrentGroup={currentGroupWeeks.has(dateStart)}
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
	isInCurrentGroup,
}: {
	dateStart: string;
	daysInOffice: number;
	isPotentiallyIncomplete: boolean;
	isInCurrentGroup: boolean;
}) => {
	const formattedDateStart = new Date(dateStart).toLocaleDateString("en-GB");
	return (
		<Text dimColor={!isInCurrentGroup}>
			{isPotentiallyIncomplete ? "*" : " "} {formattedDateStart}: {daysInOffice}
		</Text>
	);
};
