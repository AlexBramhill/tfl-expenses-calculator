import { useEffect, useState } from "react";
import {
	type ProcessedJourneysResult,
	processJourneys,
} from "../repos/journeyCalculator";
import { logDebug, logError } from "../logPublisher";
import { parseCsv } from "../repos/tflCsvParser";

const useJourneyLookups = ({
	files,
	homeStations,
	officeStations,
	ignoreWeekends = true,
}: {
	files: string[];
	homeStations: string[];
	officeStations: string[];
	ignoreWeekends?: boolean;
}) => {
	const [journeyLookups, setJourneyLookups] = useState<
		Record<string, ProcessedJourneysResult>
	>({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		logDebug(`useJourneyLookups effect fired: files=${files.length}, homeStations=${JSON.stringify(homeStations)}, officeStations=${JSON.stringify(officeStations)}`);

		if (files.length === 0) {
			logDebug("useJourneyLookups: no files, skipping");
			return;
		}

		setLoading(true);
		(async () => {
			try {
				const results = await Promise.all(
					files.map(async (filename) => {
						logDebug(`Parsing CSV: ${filename}`);
						const journeys = await parseCsv(filename);
						logDebug(`Parsed ${journeys.length} journeys from ${filename}`);
						const result = processJourneys({
							journeys,
							homeStations,
							officeStations,
							ignoreWeekends,
						});
						logDebug(`Processed ${filename}: ${result.processedJourneys.filter(j => j.isHomeOfficeJourney).length}/${result.processedJourneys.length} home-office journeys`);
						return { filename, result };
					}),
				);

				const recordResults = results.reduce<
					Record<string, ProcessedJourneysResult>
				>((acc, { filename, result }) => ({ ...acc, [filename]: result }), {});
				setError(null);
				setJourneyLookups(recordResults);
				logDebug(`Journey lookups set for ${results.length} file(s)`);
			} catch (err) {
				logError(`useJourneyLookups error: ${err instanceof Error ? err.message : String(err)}`);
				setError(err instanceof Error ? err : new Error(String(err)));
			} finally {
				setLoading(false);
			}
		})();
	}, [files, homeStations, officeStations, ignoreWeekends]);

	return { journeyLookups, loading, error };
};

export default useJourneyLookups;
