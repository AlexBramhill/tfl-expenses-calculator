import { Box, Text } from "ink";
import type { Journey } from "../repos/tflCsvParser";
import { formatCharge, formatDate, maxLength } from "../utils/TextFormatters";

export const JourneyList = ({
	journeys,
	allJourneys,
}: {
	journeys: Journey[];
	allJourneys: Journey[];
}) => {
	const dateWidth = maxLength(allJourneys.map((j) => formatDate(j.datetime)));
	const startWidth = maxLength(allJourneys.map((j) => j.startStation));
	const endWidth = maxLength(allJourneys.map((j) => j.endStation));
	const chargeWidth = maxLength(
		allJourneys.map((j) => formatCharge(j.chargeAmount)),
	);

	const heading = `${"Date".padEnd(dateWidth)} | ${"From".padEnd(startWidth)} | ${"To".padEnd(endWidth)} | ${"Charge".padEnd(chargeWidth)}`;

	return (
		<Box flexDirection="column">
			<Text bold underline>
				{heading}
			</Text>
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
	journeyRow: Journey;
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
		// <Text color={journeyRow.isHomeOfficeJourney ? "green" : "grey"}>
		<Text>
			{date} | {stations} | {charge}
		</Text>
	);
};
