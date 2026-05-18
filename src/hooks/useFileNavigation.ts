import { useInput } from "ink";
import { useEffect, useState } from "react";
import { SpecialKeys } from "../specialKeys";
import type { CsvFilesResult } from "./useCsvFiles";

const useFileNavigation = (csvFilesResult: CsvFilesResult) => {
	const [currentSelectedFile, setCurrentSelectedFile] = useState<string | null>(
		null,
	);
	const [visibleSummaries, setVisibleSummaries] = useState<Set<string>>(
		new Set(),
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

	useInput((input) => {
		if (!currentSelectedFile || csvFilesResult.isLoading) return;

		const currentIndex = csvFilesResult.filePaths.indexOf(currentSelectedFile);

		if (input === SpecialKeys.ArrowDown) {
			setCurrentSelectedFile(
				csvFilesResult.filePaths[
					Math.min(currentIndex + 1, csvFilesResult.filePaths.length - 1)
				],
			);
		}
		if (input === SpecialKeys.ArrowUp) {
			setCurrentSelectedFile(
				csvFilesResult.filePaths[Math.max(currentIndex - 1, 0)],
			);
		}
		if (input === SpecialKeys.Enter) {
			setVisibleSummaries((prev) => {
				const next = new Set(prev);
				if (next.has(currentSelectedFile)) {
					next.delete(currentSelectedFile);
				} else {
					next.add(currentSelectedFile);
				}
				return next;
			});
		}
	});

	const isSummaryVisible = (filePath: string) => visibleSummaries.has(filePath);

	return { currentSelectedFile, isSummaryVisible };
};

export default useFileNavigation;
