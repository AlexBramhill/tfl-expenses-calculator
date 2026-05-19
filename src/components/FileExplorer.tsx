import path from "node:path";
import { Box, Text } from "ink";
import { useMemo } from "react";
import useCsvFiles from "../hooks/useCsvFiles";
import useFileJourneys from "../hooks/useFileJourneys";
import useFileNavigation from "../hooks/useFileNavigation";
import type { Config } from "../repos/configRepo";
import { FileDetailPanels } from "./FileDetailPanels";

export const FileExplorer = ({ config }: { config: Config }) => {
	const {
		filePaths,
		isLoading: isFilesLoading,
		error: filesError,
	} = useCsvFiles(config.csvFolder);

	const { records, isLoading: isJourneysLoading } = useFileJourneys({
		filePaths: filePaths ?? [],
		homeStations: config.homeStations,
		officeStations: config.officeStations,
		ignoreWeekends: config.ignoreWeekends,
	});

	const [validPaths, invalidPaths] = useMemo(
		() =>
			(filePaths ?? []).reduce<[string[], string[]]>(
				(acc, filePath) => {
					acc[records[filePath] instanceof Error ? 1 : 0].push(filePath);
					return acc;
				},
				[[], []],
			),
		[filePaths, records],
	);

	const { currentSelectedFile } = useFileNavigation(validPaths);

	if (isFilesLoading || isJourneysLoading) return <Text>Loading...</Text>;
	if (filesError) return <Text>Error loading files: {filesError.message}</Text>;

	const selectedResult = currentSelectedFile
		? records[currentSelectedFile]
		: null;

	return (
		<Box flexDirection="row" gap={2} flexGrow={1}>
			<Box flexDirection="column">
				{filePaths.map((filePath) => {
					const isSelected = currentSelectedFile === filePath;
					const isInvalid = invalidPaths.includes(filePath);
					return (
						<Text
							key={filePath}
							color={isInvalid ? undefined : isSelected ? "green" : undefined}
							dimColor={isInvalid}
						>
							{isSelected ? "> " : "  "}
							<Text underline={!isInvalid}>{path.basename(filePath)}</Text>
						</Text>
					);
				})}
			</Box>
			{currentSelectedFile &&
				selectedResult &&
				!(selectedResult instanceof Error) && (
					<FileDetailPanels
						key={currentSelectedFile}
						journeysResult={selectedResult}
					/>
				)}
		</Box>
	);
};
