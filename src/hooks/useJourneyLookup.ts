import { useEffect, useState } from "react";
import { logDebug, logError } from "../logPublisher";
import {
	type ProcessedJourneysResult,
	processJourneys,
} from "../repos/journeyCalculator";
import { parseCsv } from "../repos/tflCsvParser";

type JourneyLookupResult =
	| { isLoading: true; journeyLookupResult: null; error: null }
	| {
			isLoading: false;
			journeyLookupResult: ProcessedJourneysResult;
			error: Error | null;
	  };

const useJourneyLookup = ({
	filePath,
	homeStations,
	officeStations,
	ignoreWeekends = true,
}: {
	filePath: string;
	homeStations: string[];
	officeStations: string[];
	ignoreWeekends?: boolean;
}): JourneyLookupResult => {
	const [journeyLookupResult, setJourneyLookupResult] =
		useState<ProcessedJourneysResult | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			try {
				const result = await processFile(
					homeStations,
					officeStations,
					ignoreWeekends,
					filePath,
				);
				setError(null);
				setJourneyLookupResult(result);
				logDebug(`Journey lookups set for ${Object.keys(result)} file(s)`);
			} catch (err) {
				logError(
					`useJourneyLookups error: ${err instanceof Error ? err.message : String(err)}`,
				);
				setError(err instanceof Error ? err : new Error(String(err)));
			} finally {
				setIsLoading(false);
			}
		})();
	}, [filePath, homeStations, officeStations, ignoreWeekends]);

	return {
		journeyLookupResult: journeyLookupResult,
		isLoading,
		error,
	} as JourneyLookupResult;
};

const processFile = async (
	homeStations: string[],
	officeStations: string[],
	ignoreWeekends: boolean,
	filePath: string,
) => {
	logDebug(`Parsing CSV: ${filePath}`);
	const journeys = await parseCsv(filePath);
	logDebug(`Parsed ${journeys.length} journeys from ${filePath}`);
	const result = processJourneys({
		journeys,
		homeStations,
		officeStations,
		ignoreWeekends,
	});

	logDebug(
		`Processed ${filePath}: ${
			result.processedJourneys.filter((j) => j.isHomeOfficeJourney).length
		}/${result.processedJourneys.length} home-office journeys`,
	);
	return result;
};

export default useJourneyLookup;
