import { useEffect, useState } from "react";
import { logDebug } from "../logPublisher";
import { listCsvFiles } from "../repos/csvRepo";

export type CsvFilesResult =
	| { isLoading: true; filePaths: null; error: null }
	| { isLoading: false; filePaths: string[]; error: Error | null };

const useCsvFiles = (folder: string | undefined): CsvFilesResult => {
	const [filePaths, setFilePaths] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	// TODO: consider having creating a folder if none exist
	useEffect(() => {
		if (!folder) {
			setError(new Error("CSV folder is not defined in config"));
			return;
		}
		setError(null);
		setIsLoading(true);
		(async () => {
			try {
				logDebug(`Fetching CSV files from: ${folder}`);
				const csvs = await listCsvFiles(folder);
				setFilePaths(csvs);
			} catch (err) {
				setError(err instanceof Error ? err : new Error(String(err)));
			} finally {
				setIsLoading(false);
			}
		})();
	}, [folder]);

	return { filePaths, isLoading, error } as CsvFilesResult;
};

export default useCsvFiles;
