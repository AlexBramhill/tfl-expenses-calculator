import { randomUUID, type UUID } from "node:crypto";

export type LogSeverity = "debug" | "info" | "warning" | "error";

export type LogEntry = {
	id: UUID;
	message: string;
	timestamp: Date;
	severity: LogSeverity;
};

const MAX_LOG_LENGTH = 20;
export const logEntries: LogEntry[] = [];

const listeners = new Set<() => void>();

export const addLogListener = (listener: () => void): void => {
	listeners.add(listener);
};

export const deleteLogListener = (listener: () => void): void => {
	listeners.delete(listener);
};

export const logDebug = (message: string) => {
	return log({ message: message, timestamp: new Date(), severity: "debug" });
};

export const logInfo = (message: string) => {
	return log({ message: message, timestamp: new Date(), severity: "info" });
};

export const logWarning = (message: string) => {
	return log({ message: message, timestamp: new Date(), severity: "warning" });
};

export const logError = (message: string) => {
	return log({ message: message, timestamp: new Date(), severity: "error" });
};

export const log = ({
	message,
	timestamp,
	severity,
}: {
	message: string;
	timestamp: Date;
	severity: LogSeverity;
}) => {
	logEntries.push({ id: randomUUID(), message, timestamp, severity });
	if (logEntries.length > MAX_LOG_LENGTH) logEntries.shift();

	listeners.forEach((listener) => {
		listener();
	});
};
