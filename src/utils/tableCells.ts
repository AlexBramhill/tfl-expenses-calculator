export const longestLength = (strings: string[]) =>
	Math.max(0, ...strings.map((string) => string.length));

export const truncate = (value: string, maxWidth?: number) =>
	maxWidth !== undefined && value.length > maxWidth
		? `${value.slice(0, Math.max(0, maxWidth - 1))}…`
		: value;

export const columnWidth = (values: string[], maxWidth?: number) =>
	Math.min(maxWidth ?? Infinity, longestLength(values));
