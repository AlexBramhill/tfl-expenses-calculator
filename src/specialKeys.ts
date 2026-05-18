export const SpecialKeys = {
	ArrowDown: "\u001B[B",
	ArrowUp: "\u001B[A",
	ArrowRight: "\u001B[C",
	ArrowLeft: "\u001B[D",
	Enter: "\r",
} as const;

export type SpecialKey = (typeof SpecialKeys)[keyof typeof SpecialKeys];
