import { Line } from "@/components/Line";
import type { Journey } from "@/features/journeys";
import { formatCharge, formatDate } from "../utils/textFormatters";

export const OpenedJourneyInfo = ({ journey }: { journey: Journey }) => (
	<>
		<Line>Date: {formatDate(journey.datetime)}</Line>
		<Line>Charge: {formatCharge(journey.chargeAmount)}</Line>
	</>
);
