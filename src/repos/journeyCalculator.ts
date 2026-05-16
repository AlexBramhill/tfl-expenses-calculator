import { logDebug } from "../logPublisher";
import type { Journey } from "./tflCsvParser";

export type ProcessedJourney = { isHomeOfficeJourney: boolean } & Journey;
export type ProcessedJourneysSummary = {
	totalDaysInOffice: number;
	totalTrips: number;
	totalCharge: number;
};

export type ProcessedJourneysResult = {
	processedJourneys: ProcessedJourney[];
	summary: ProcessedJourneysSummary;
};

export const processJourneys = ({
	journeys,
	homeStations,
	officeStations,
	ignoreWeekends = true,
}: {
	journeys: Journey[];
	homeStations: string[];
	officeStations: string[];
	ignoreWeekends?: boolean;
}) => {
	const processedJourneys = journeys.map((journey) => ({
		...journey,
		isHomeOfficeJourney: isHomeOfficeJourney({
			journey,
			homeStations,
			officeStations,
			ignoreWeekends,
		}),
	}));

	return {
		processedJourneys,
		summary: getSummary(processedJourneys),
	};
};

const isHomeOfficeJourney = ({
	journey,
	homeStations,
	officeStations,
	ignoreWeekends,
}: {
	journey: Journey;
	homeStations: string[];
	officeStations: string[];
	ignoreWeekends: boolean;
}) => {
	const day = journey.datetime.getDay();
	const isWeekend = day === 0 || day === 6;

	if (ignoreWeekends && isWeekend) {
		return false;
	}

	const isGoingToOfficeFromHome =
		homeStations.includes(journey.startStation) &&
		officeStations.includes(journey.endStation);
	const isGoingHomeFromOffice =
		homeStations.includes(journey.endStation) &&
		officeStations.includes(journey.startStation);

	if (!isGoingToOfficeFromHome && !isGoingHomeFromOffice) {
		logDebug(
			`No match: "${journey.startStation}" -> "${journey.endStation}" | home=${JSON.stringify(homeStations)} office=${JSON.stringify(officeStations)}`,
		);
	}

	return isGoingToOfficeFromHome || isGoingHomeFromOffice;
};

const getSummary = (
	processedJourneys: ProcessedJourney[],
): ProcessedJourneysSummary => {
	const homeOfficeJourneys = processedJourneys.filter(
		(journey) => journey.isHomeOfficeJourney,
	);
	const totalDaysInOffice = new Set(
		homeOfficeJourneys.map((x) => x.datetime.toDateString()),
	).size;
	const totalTrips = homeOfficeJourneys.length;
	const totalCharge = homeOfficeJourneys.reduce(
		(sum, journey) => sum + journey.chargeAmount,
		0,
	);

	return {
		totalDaysInOffice,
		totalTrips,
		totalCharge,
	};
};
