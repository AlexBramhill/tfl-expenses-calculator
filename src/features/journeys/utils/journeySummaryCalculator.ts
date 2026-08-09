import type { Journey } from "./journeyCalculator";

export type JourneySummaryTotals = {
	totalDaysInOffice: number;
	totalTrips: number;
	totalCharge: number;
};

export const getTotalSummary = (journeys: Journey[]): JourneySummaryTotals => {
	const homeOfficeJourneys = journeys.filter(
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
