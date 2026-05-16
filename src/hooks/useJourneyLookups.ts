import { useEffect, useState } from "react";
import {
	type ProcessedJourneysResult,
	processJourneys,
} from "../repos/journeyCalculator";
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
		if (files.length === 0) return;

		setLoading(true);
		(async () => {
			try {
				const results = await Promise.all(
					files.map(async (filename) => {
						const journeys = await parseCsv(filename);
						const result = processJourneys({
							journeys,
							homeStations,
							officeStations,
							ignoreWeekends,
						});
						return { filename, result };
					}),
				);

				const recordResults = results.reduce<
					Record<string, ProcessedJourneysResult>
				>((acc, { filename, result }) => ({ ...acc, [filename]: result }), {});
				setError(null);
				setJourneyLookups(recordResults);
			} catch (err) {
				setError(err instanceof Error ? err : new Error(String(err)));
			} finally {
				setLoading(false);
			}
		})();
	}, [files, homeStations, officeStations, ignoreWeekends]);

	return { journeyLookups, loading, error };
};

export default useJourneyLookups;
