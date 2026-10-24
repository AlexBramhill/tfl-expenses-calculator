import { Box, Text } from "ink";
import type { LogEntry } from "@/features/logs/api/logPublisher";
import { useLogs } from "@/features/logs/hooks/useLogs";

const severityColour = (s: LogEntry["severity"]) => {
	if (s === "error") return "red";
	if (s === "warning") return "yellow";
	if (s === "debug") return "gray";
	return undefined;
};

const LogStreamRow = ({ logEntry }: { logEntry: LogEntry }) => {
	return (
		<Text
			color={severityColour(logEntry.severity)}
			overflow-y={"hidden"}
			wrap={"truncate-start"}
		>
			{logEntry.message}
		</Text>
	);
};

export const LogStream = () => {
	const { logEntries } = useLogs();
	return (
		<Box flexDirection="column">
			{logEntries.map((entry) => (
				<LogStreamRow key={entry.id} logEntry={entry} />
			))}
		</Box>
	);
};
