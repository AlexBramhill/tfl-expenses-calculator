import { Line } from "@/components/Line";
import type { Journey } from "../utils/journeyCalculator";
import { formatCharge, formatDate } from "../utils/textFormatters";

export const JourneyDetails = ({ journey }: { journey: Journey }) => (
	<>
		<Line>Date: {formatDate(journey.datetime)}</Line>
		<Line>From: {journey.startStation}</Line>
		<Line>To: {journey.endStation}</Line>
		<Line>Charge: {formatCharge(journey.chargeAmount)}</Line>
		<Line>Home to office: {journey.isHomeOfficeJourney ? "yes" : "no"}</Line>
		<Line>File: {journey.fileName}</Line>
	</>
);
