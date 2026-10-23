export const formatDate = (date: Date) =>
	date.toLocaleString("en-GB", {
		weekday: "short",
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
export const formatCharge = (amount: number) => `£${amount.toFixed(2)}`;

export const longestLength = (strings: string[]) =>
	Math.max(0, ...strings.map((string) => string.length));

export const truncate = (value: string, maxWidth?: number) =>
	maxWidth !== undefined && value.length > maxWidth
		? `${value.slice(0, Math.max(0, maxWidth - 1))}…`
		: value;

export const columnWidth = (values: string[], maxWidth?: number) =>
	Math.min(maxWidth ?? Infinity, longestLength(values));
