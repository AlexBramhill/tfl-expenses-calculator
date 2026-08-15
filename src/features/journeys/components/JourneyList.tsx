import { Box, Text } from "ink";
import Pagination from "@/components/Pagination";
import type { Journey } from "@/features/journeys";
import {
	columnWidth,
	formatCharge,
	formatDate,
	truncate,
} from "../utils/textFormatters";

type Column = {
	header: string;
	getValue: (journey: Journey) => string;
	maxLength?: number;
};

const dateColumn: Column = {
	header: "Date",
	getValue: (journey) => formatDate(journey.datetime),
};
const fromColumn: Column = {
	header: "From",
	getValue: (journey) => journey.startStation,
	maxLength: 30,
};
const toColumn: Column = {
	header: "To",
	getValue: (journey) => journey.endStation,
	maxLength: 30,
};
const chargeColumn: Column = {
	header: "Charge",
	getValue: (journey) => formatCharge(journey.chargeAmount),
};

const columns: Column[] = [dateColumn, fromColumn, toColumn, chargeColumn];

const cellValue = (column: Column, journey: Journey, width: number) =>
	truncate(column.getValue(journey), column.maxLength).padEnd(width);

const journeyKey = (journey: Journey) =>
	`${journey.datetime.toISOString()}-${journey.startStation}-${journey.endStation}-${journey.chargeAmount}-${journey.fileName}`;

export const JourneyList = ({
	journeys,
	isFocused,
}: {
	journeys: Journey[];
	isFocused: boolean;
}) => {
	const widths = new Map(
		columns.map((column) => [
			column,
			columnWidth(journeys.map(column.getValue), column.maxLength),
		]),
	);

	const heading = columns
		.map((column) => column.header.padEnd(widths.get(column) ?? 0))
		.join(" | ");

	return (
		<Box flexDirection="column" flexGrow={1}>
			<Text bold underline>
				{heading}
			</Text>
			<Pagination items={journeys} isFocused={isFocused}>
				{(journeysOnPage) => (
					<>
						{journeysOnPage.map((journey) => (
							<JourneyRow
								key={journeyKey(journey)}
								journey={journey}
								widths={widths}
							/>
						))}
					</>
				)}
			</Pagination>
		</Box>
	);
};

const JourneyRow = ({
	journey,
	widths,
}: {
	journey: Journey;
	widths: Map<Column, number>;
}) => {
	const separator = " | ";
	const dateWidth = widths.get(dateColumn) ?? 0;
	const fromWidth = widths.get(fromColumn) ?? 0;
	const toWidth = widths.get(toColumn) ?? 0;
	const chargeWidth = widths.get(chargeColumn) ?? 0;

	const date = cellValue(dateColumn, journey, dateWidth);
	const charge = cellValue(chargeColumn, journey, chargeWidth);
	const hasEnd = journey.endStation.length > 0;

	const stations = hasEnd
		? `${cellValue(fromColumn, journey, fromWidth)}${separator}${cellValue(toColumn, journey, toWidth)}`
		: truncate(journey.startStation, fromColumn.maxLength).padEnd(
				fromWidth + separator.length + toWidth,
			);

	return (
		<Text
			color={journey.isHomeOfficeJourney ? "green" : undefined}
			dimColor={!journey.isHomeOfficeJourney}
		>
			{date}
			{separator}
			{stations}
			{separator}
			{charge}
		</Text>
	);
};
