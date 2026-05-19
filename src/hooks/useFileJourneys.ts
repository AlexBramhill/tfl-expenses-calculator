import { useEffect, useState } from "react";
import {
	type ProcessedJourneysResult,
	processJourneys,
} from "../repos/journeyCalculator";
import { parseCsv } from "../repos/tflCsvParser";

export type FileJourneysRecord = Record<
	string,
	ProcessedJourneysResult | Error
>;

const useFileJourneys = ({
	filePaths,
	homeStations,
	officeStations,
	ignoreWeekends = true,
}: {
	filePaths: string[];
	homeStations: string[];
	officeStations: string[];
	ignoreWeekends?: boolean;
}): { records: FileJourneysRecord; isLoading: boolean } => {
	const [records, setRecords] = useState<FileJourneysRecord>({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (filePaths.length === 0) return;
		setIsLoading(true);

		Promise.all(
			filePaths.map(async (filePath) => {
				try {
					const journeys = await parseCsv(filePath);
					if (journeys.length === 0)
						return [filePath, new Error("No journeys found")] as const;
					const result = processJourneys({
						journeys,
						homeStations,
						officeStations,
						ignoreWeekends,
					});
					return [filePath, result] as const;
				} catch (err) {
					return [
						filePath,
						err instanceof Error ? err : new Error(String(err)),
					] as const;
				}
			}),
		).then((entries) => {
			setRecords(Object.fromEntries(entries));
			setIsLoading(false);
		});
	}, [filePaths, homeStations, officeStations, ignoreWeekends]);

	return { records, isLoading };
};

export default useFileJourneys;
