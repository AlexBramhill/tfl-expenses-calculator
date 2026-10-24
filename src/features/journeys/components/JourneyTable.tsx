import Table, { type RowStyle, type TableColumn } from "@/components/Table";
import { useThemeColour } from "@/components/ThemeColour";
import type { Journey } from "@/features/journeys";
import {
	formatCharge,
	formatDate,
} from "@/features/journeys/utils/textFormatters";

const JOURNEY_COLUMNS: TableColumn<Journey>[] = [
	{
		header: "Date",
		getValue: (journey) => formatDate(journey.datetime),
	},
	{
		header: "From",
		getValue: (journey) => journey.startStation,
		maxWidth: 30,
	},
	{
		header: "To",
		getValue: (journey) => journey.endStation,
		maxWidth: 30,
	},
	{
		header: "Charge",
		getValue: (journey) => formatCharge(journey.chargeAmount),
	},
];

export const JourneyTable = ({
	journeys,
	isFocused,
	isSelectionVisible,
	onSelectJourney,
}: {
	journeys: Journey[];
	isFocused: boolean;
	isSelectionVisible: boolean;
	onSelectJourney: (journey: Journey) => void;
}) => {
	const themeColour = useThemeColour();

	return (
		<Table
			columns={JOURNEY_COLUMNS}
			rows={journeys}
			getRowKey={getJourneyKey}
			getRowStyle={(journey) => getJourneyRowStyle(journey, themeColour)}
			isFocused={isFocused}
			isSelectionVisible={isSelectionVisible}
			onSelectRow={onSelectJourney}
		/>
	);
};

const getJourneyRowStyle = (journey: Journey, themeColour: string): RowStyle =>
	journey.isHomeOfficeJourney ? { color: themeColour } : { dimColor: true };

const getJourneyKey = (journey: Journey) =>
	`${journey.datetime.toISOString()}-${journey.startStation}-${journey.endStation}-${journey.chargeAmount}-${journey.fileName}`;
