import { Text } from "ink";
import type { ProcessedJourneysResult } from "../repos/journeyCalculator";

export const DaysInOfficePerWeekSummary = ({
	journeysResult,
}: {
	journeysResult: ProcessedJourneysResult;
}) => {
	return (
		<>
			{Object.entries(journeysResult.weeklySummaries).map(
				([dateStart, summary]) => (
					<DaysInOfficeSummary
						key={dateStart}
						dateStart={dateStart}
						daysInOffice={summary.totalDaysInOffice}
					/>
				),
			)}
		</>
	);
};

const DaysInOfficeSummary = ({
	dateStart,
	daysInOffice,
}: {
	dateStart: string;
	daysInOffice: number;
}) => (
	<Text>
		{dateStart}: {daysInOffice}
	</Text>
);
