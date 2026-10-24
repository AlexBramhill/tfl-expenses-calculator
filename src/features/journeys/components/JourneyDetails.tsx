import { Line } from "@/components/Line";
import type { Journey } from "../utils/journeyCalculator";
import { formatCharge, formatDate } from "../utils/textFormatters";

export const JourneyDetails = ({ journey }: { journey: Journey }) => (
	<>
		<Line>Date: {formatDate(journey.datetime)}</Line>
		<Line>Charge: {formatCharge(journey.chargeAmount)}</Line>
	</>
);
