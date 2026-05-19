import { Box, Text } from "ink";
import type { ProcessedJourney } from "../repos/journeyCalculator";

const formatDate = (date: Date) =>
	date.toLocaleString("en-GB", {
		weekday: "short",
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});

const formatCharge = (amount: number) => `£${amount.toFixed(2)}`;

const maxLength = (strings: string[]) =>
	Math.max(0, ...strings.map((s) => s.length));

export const CsvList = ({
	journeys,
	allJourneys,
}: {
	journeys: ProcessedJourney[];
	allJourneys: ProcessedJourney[];
}) => {
	const dateWidth = maxLength(allJourneys.map((j) => formatDate(j.datetime)));
	const startWidth = maxLength(allJourneys.map((j) => j.startStation));
	const endWidth = maxLength(allJourneys.map((j) => j.endStation));
	const chargeWidth = maxLength(
		allJourneys.map((j) => formatCharge(j.chargeAmount)),
	);

	return (
		<Box flexDirection="column">
			<Text bold>Journey Details:</Text>
			{journeys.map((journey) => (
				<CsvRow
					key={journey.datetime.toISOString()}
					journeyRow={journey}
					dateWidth={dateWidth}
					startWidth={startWidth}
					endWidth={endWidth}
					chargeWidth={chargeWidth}
				/>
			))}
		</Box>
	);
};

const CsvRow = ({
	journeyRow,
	dateWidth,
	startWidth,
	endWidth,
	chargeWidth,
}: {
	journeyRow: ProcessedJourney;
	dateWidth: number;
	startWidth: number;
	endWidth: number;
	chargeWidth: number;
}) => {
	const date = formatDate(journeyRow.datetime).padEnd(dateWidth);
	const charge = formatCharge(journeyRow.chargeAmount).padEnd(chargeWidth);
	const hasEnd = journeyRow.endStation.length > 0;

	const stations = hasEnd
		? `${journeyRow.startStation.padEnd(startWidth)} | ${journeyRow.endStation.padEnd(endWidth)}`
		: journeyRow.startStation.padEnd(startWidth + 3 + endWidth);

	return (
		<Text color={journeyRow.isHomeOfficeJourney ? "green" : "grey"}>
			{date} | {stations} | {charge}
		</Text>
	);
};
