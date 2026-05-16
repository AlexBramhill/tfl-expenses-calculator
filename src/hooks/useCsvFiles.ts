import { useEffect, useState } from "react";
import { logDebug } from "../logPublisher";
import { listCsvFiles } from "../repos/csvRepo";

const useCsvFiles = (folder: string | undefined) => {
	const [files, setFiles] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	// TODO: consider having creating a folder if none exist
	useEffect(() => {
		if (!folder) {
			setError(new Error("CSV folder is not defined in config"));
			return;
		}
		setLoading(true);
		(async () => {
			try {
				logDebug(`Fetching CSV files from: ${folder}`);
				const csvs = await listCsvFiles(folder);
				setFiles(csvs);
			} catch (err) {
				setError(err instanceof Error ? err : new Error(String(err)));
			} finally {
				setLoading(false);
			}
		})();
	}, [folder]);

	return { files, loading, error };
};

export default useCsvFiles;
