import { Box } from "ink";
import { Line } from "@/components/Line";
import PagedList from "@/components/PagedList";
import { FocusBox } from "@/features/journeys/components/FocusBox";
import useFocusBox from "@/features/journeys/hooks/useFocusBox";
import type { WeeklySummaryByDate } from "@/features/journeys/utils/weeklyJourneySummaryCalculator";

export const DaysInOfficePerWeekSummary = ({
	weeklySummaries,
	currentGroupWeeks,
}: {
	weeklySummaries: WeeklySummaryByDate;
	currentGroupWeeks: Set<string>;
}) => {
	const { isFocused } = useFocusBox();
	const weeklyEntries = Object.entries(weeklySummaries)
		.filter(([dateStart]) => currentGroupWeeks.has(dateStart))
		.sort(([a], [b]) => a.localeCompare(b));
	const isAnyWeekPotentiallyIncomplete = weeklyEntries.some(
		([, { isPotentiallyIncomplete }]) => isPotentiallyIncomplete,
	);

	return (
		<FocusBox isFocused={isFocused} minWidth={33}>
			<Line bold>Days in office per week:</Line>
			{isAnyWeekPotentiallyIncomplete && (
				<Line dimColor>* Week potentially incomplete</Line>
			)}
			<PagedList items={weeklyEntries} isFocused={isFocused}>
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
			</PagedList>
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
		<Line>
			{isPotentiallyIncomplete ? "*" : " "} {formattedDateStart}: {daysInOffice}
		</Line>
	);
};
