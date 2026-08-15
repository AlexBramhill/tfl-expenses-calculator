export const toError = (err: unknown): Error =>
	err instanceof Error ? err : new Error(String(err));

export const isErrnoCode = (err: unknown, code: string): boolean =>
	err instanceof Error && (err as NodeJS.ErrnoException).code === code;
