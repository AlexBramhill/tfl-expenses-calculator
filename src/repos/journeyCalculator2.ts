import { logDebug } from "../logPublisher";
import type { UnprocessedJourney } from "./tflCsvParser";

export type Journey = {
	isHomeOfficeJourney: boolean;
} & UnprocessedJourney;

export const processJourneys = ({
	journeys,
	homeStations,
	officeStations,
	ignoreWeekends = true,
}: {
	journeys: UnprocessedJourney[];
	homeStations: string[];
	officeStations: string[];
	ignoreWeekends?: boolean;
}): Journey[] => {
	return journeys.map(
		(journey: UnprocessedJourney): Journey => ({
			...journey,
			isHomeOfficeJourney: isHomeToWorkJourney({
				journey,
				homeStations,
				officeStations,
				isIncludingWeekends: ignoreWeekends,
			}),
		}),
	);
};

const isHomeToWorkJourney = ({
	journey,
	homeStations,
	officeStations,
	ignoreWeekends,
}: {
	journey: UnprocessedJourney;
	homeStations: string[];
	officeStations: string[];
	ignoreWeekends: boolean;
}): boolean => {
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
