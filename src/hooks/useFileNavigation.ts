import { useInput } from "ink";
import { useEffect, useState } from "react";
import type { CsvFilesResult } from "./useCsvFiles";

const useFileNavigation = (csvFilesResult: CsvFilesResult) => {
	const [currentSelectedFile, setCurrentSelectedFile] = useState<string | null>(
		null,
	);

	useEffect(() => {
		if (csvFilesResult.isLoading || csvFilesResult.filePaths.length === 0)
			return;
		if (
			currentSelectedFile != null &&
			csvFilesResult.filePaths.includes(currentSelectedFile)
		)
			return;
		setCurrentSelectedFile(csvFilesResult.filePaths[0]);
	}, [csvFilesResult, currentSelectedFile]);

	useInput((_input, key) => {
		if (!currentSelectedFile || csvFilesResult.isLoading) return;

		const currentIndex = csvFilesResult.filePaths.indexOf(currentSelectedFile);

		if (key.downArrow) {
			setCurrentSelectedFile(
				csvFilesResult.filePaths[
					Math.min(currentIndex + 1, csvFilesResult.filePaths.length - 1)
				],
			);
		}
		if (key.upArrow) {
			setCurrentSelectedFile(
				csvFilesResult.filePaths[Math.max(currentIndex - 1, 0)],
			);
		}
	});

	return { currentSelectedFile };
};

export default useFileNavigation;
