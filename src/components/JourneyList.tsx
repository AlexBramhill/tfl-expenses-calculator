import { Box, Text } from "ink";
import type { UnprocessedJourney } from "../libs/tflCsvParser";
import { formatCharge, formatDate, maxLength } from "../utils/TextFormatters";

export const JourneyList = ({
	journeys,
	allJourneys,
}: {
	journeys: UnprocessedJourney[];
	allJourneys: UnprocessedJourney[];
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
				<JourneyRow
					key={journey.datetime.toISOString()}
					journey={journey}
					dateWidth={dateWidth}
					startWidth={startWidth}
					endWidth={endWidth}
					chargeWidth={chargeWidth}
				/>
			))}
		</Box>
	);
};

const JourneyRow = ({
	journey,
	dateWidth,
	startWidth,
	endWidth,
	chargeWidth,
}: {
	journey: UnprocessedJourney;
	dateWidth: number;
	startWidth: number;
	endWidth: number;
	chargeWidth: number;
}) => {
	const date = formatDate(journey.datetime).padEnd(dateWidth);
	const charge = formatCharge(journey.chargeAmount).padEnd(chargeWidth);
	const hasEnd = journey.endStation.length > 0;

	const stations = hasEnd
		? `${journey.startStation.padEnd(startWidth)} | ${journey.endStation.padEnd(endWidth)}`
		: journey.startStation.padEnd(startWidth + 3 + endWidth);

	return (
		// <Text color={journeyRow.isHomeOfficeJourney ? "green" : "grey"}>
		<Text>
			{date} | {stations} | {charge}
		</Text>
	);
};
