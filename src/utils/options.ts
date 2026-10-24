export const getNextOption = <T>(
	options: readonly T[],
	current: T,
	direction: 1 | -1,
) =>
	options.at((options.indexOf(current) + direction) % options.length) ??
	current;
