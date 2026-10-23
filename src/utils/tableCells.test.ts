import { describe, expect, it } from "vitest";
import { columnWidth, truncate } from "./tableCells";

describe("truncate", () => {
	it.each([
		{
			behaviour: "leaves values within the limit alone",
			value: "Bank",
			limit: 10,
			expected: "Bank",
		},
		{
			behaviour: "shortens long values with an ellipsis",
			value: "King's Cross St. Pancras",
			limit: 10,
			expected: "King's Cr…",
		},
		{
			behaviour: "leaves values alone with no limit",
			value: "King's Cross St. Pancras",
			limit: undefined,
			expected: "King's Cross St. Pancras",
		},
	])("$behaviour", ({ value, limit, expected }) => {
		expect(truncate(value, limit)).toBe(expected);
	});
});

describe("columnWidth", () => {
	const values = ["Bank", "Old Street"];

	it("fits the longest value", () => {
		expect(columnWidth(values)).toBe(10);
	});

	it("never exceeds the max width", () => {
		expect(columnWidth(values, 6)).toBe(6);
	});
});
