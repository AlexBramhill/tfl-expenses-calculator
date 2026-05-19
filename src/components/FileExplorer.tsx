import path from "node:path";
import { Box, Text } from "ink";
import useFileNavigation from "../hooks/useFileNavigation";
import useCsvFiles from "../hooks/useCsvFiles";
import type { Config } from "../repos/configRepo";
import { FileDetailPanels } from "./FileDetailPanels";

export const FileExplorer = ({ config }: { config: Config }) => {
	const csvFilesResult = useCsvFiles(config.csvFolder);
	const { currentSelectedFile } = useFileNavigation(csvFilesResult);

	if (csvFilesResult.isLoading) return <Text>Loading...</Text>;
	if (csvFilesResult.error)
		return <Text>Error loading files: {csvFilesResult.error.message}</Text>;

	return (
		<Box flexDirection="row" gap={2} flexGrow={1}>
			<Box flexDirection="column">
				{csvFilesResult.filePaths.map((filePath) => (
					<Text key={filePath} color={currentSelectedFile === filePath ? "green" : undefined}>
						{currentSelectedFile === filePath ? "> " : "  "}
						<Text underline>{path.basename(filePath)}</Text>
					</Text>
				))}
			</Box>
			{currentSelectedFile && (
				<FileDetailPanels
					key={currentSelectedFile}
					filePath={currentSelectedFile}
					config={config}
				/>
			)}
		</Box>
	);
};
