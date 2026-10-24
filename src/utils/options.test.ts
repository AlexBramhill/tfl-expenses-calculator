import { describe, expect, it } from "vitest";
import { getNextOption } from "@/utils/options";

describe("getNextOption", () => {
	it.each([
		{ behaviour: "moves forward", current: "a", direction: 1, expected: "b" },
		{ behaviour: "moves back", current: "c", direction: -1, expected: "b" },
		{
			behaviour: "wraps past the last option",
			current: "c",
			direction: 1,
			expected: "a",
		},
		{
			behaviour: "wraps before the first option",
			current: "a",
			direction: -1,
			expected: "c",
		},
	] as const)("$behaviour", ({ current, direction, expected }) => {
		expect(getNextOption(OPTIONS, current, direction)).toBe(expected);
	});
});

const OPTIONS = ["a", "b", "c"] as const;
