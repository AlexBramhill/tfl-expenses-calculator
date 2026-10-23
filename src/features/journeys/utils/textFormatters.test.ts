import { describe, expect, it } from "vitest";
import { formatCharge, formatDate } from "./textFormatters";

describe("formatDate", () => {
	it("shows the weekday, short date and time", () => {
		expect(formatDate(new Date("2026-07-01T08:12"))).toBe(
			"Wed, 01/07/26, 08:12",
		);
	});
});

describe("formatCharge", () => {
	it("shows pounds to two decimal places", () => {
		expect(formatCharge(2.8)).toBe("£2.80");
	});
});
