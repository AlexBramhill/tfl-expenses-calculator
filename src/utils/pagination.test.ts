import { describe, expect, it } from "vitest";
import { getItemsOnPage, getPageOfRow, getTotalPages } from "./pagination";

describe("getTotalPages", () => {
	it.each([
		{ behaviour: "rounds partial pages up", rowCount: 11, expected: 3 },
		{ behaviour: "counts exact pages", rowCount: 10, expected: 2 },
		{ behaviour: "has one page when empty", rowCount: 0, expected: 1 },
	])("$behaviour", ({ rowCount, expected }) => {
		expect(getTotalPages(rowCount, ROWS_PER_PAGE)).toBe(expected);
	});
});

describe("getPageOfRow", () => {
	it.each([
		{ behaviour: "puts the first rows on page zero", rowIndex: 4, expected: 0 },
		{
			behaviour: "starts the next page after a full one",
			rowIndex: 5,
			expected: 1,
		},
		{ behaviour: "finds a later page", rowIndex: 12, expected: 2 },
	])("$behaviour", ({ rowIndex, expected }) => {
		expect(getPageOfRow(rowIndex, ROWS_PER_PAGE)).toBe(expected);
	});
});

describe("getItemsOnPage", () => {
	it("returns only the items on the page", () => {
		const items = ["a", "b", "c", "d", "e", "f", "g"];

		expect(getItemsOnPage(items, 1, 3)).toEqual(["d", "e", "f"]);
	});
});

const ROWS_PER_PAGE = 5;
