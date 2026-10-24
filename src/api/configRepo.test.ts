import { describe, expect, it } from "vitest";
import { ConfigSchema, DEFAULT_THEME_COLOUR } from "@/api/configRepo";

describe("ConfigSchema", () => {
	it.each([
		{
			behaviour: "keeps a listed theme colour",
			themeColour: "cyan",
			expected: "cyan",
		},
		{
			behaviour: "defaults a missing theme colour",
			themeColour: undefined,
			expected: DEFAULT_THEME_COLOUR,
		},
		{
			behaviour: "replaces an unlisted theme colour",
			themeColour: "#a855f7",
			expected: DEFAULT_THEME_COLOUR,
		},
	])("$behaviour", ({ themeColour, expected }) => {
		const config = ConfigSchema.parse({ csvFolder: CSV_FOLDER, themeColour });

		expect(config.themeColour).toBe(expected);
	});
});

const CSV_FOLDER = "/journeys";
