import { Box, Text } from "ink";
import { useLogs } from "../hooks/useLogs";
import type { LogEntry } from "../logPublisher";

const severityColor = (s: LogEntry["severity"]) => {
	if (s === "error") return "red";
	if (s === "warning") return "yellow";
	if (s === "debug") return "gray";
	return undefined;
};

const LogStreamRow = ({ logEntry }: { logEntry: LogEntry }) => {
	return (
		<Text color={severityColor(logEntry.severity)}>{logEntry.message}</Text>
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
