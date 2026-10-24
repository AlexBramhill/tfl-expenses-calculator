import { Text } from "ink";
import { render } from "ink-testing-library";
import { describe, expect, it, vi } from "vitest";
import type { Config } from "@/api/configRepo";
import { ThemeColourProvider, useThemeColour } from "@/components/ThemeColour";
import ConfigEditor from "@/features/config/components/ConfigEditor";
import { FIXTURE_CONFIG } from "@/test/fixtures";
import { KEYS } from "@/test/keys";
import { letEffectsRun } from "@/test/letEffectsRun";

describe("ConfigEditor", () => {
	it("shows a new theme colour as soon as it is chosen", async () => {
		const { lastFrame, stdin } = renderSettings();
		await focusThemeColourField(stdin);

		stdin.write(KEYS.arrowRight);

		await vi.waitFor(() => expect(lastFrame()).toContain("Shown colour: cyan"));
	});

	it("goes back to the saved theme colour when left without saving", async () => {
		const { lastFrame, stdin, rerender } = renderSettings();
		await focusThemeColourField(stdin);
		stdin.write(KEYS.arrowRight);
		await vi.waitFor(() => expect(lastFrame()).toContain("Shown colour: cyan"));

		rerender(<Settings isEditorOpen={false} />);

		await vi.waitFor(() =>
			expect(lastFrame()).toContain("Shown colour: magenta"),
		);
	});
});

const SAVED_CONFIG: Readonly<Config> = {
	...FIXTURE_CONFIG,
	themeColour: "magenta",
};

const FIELDS_BEFORE_THEME_COLOUR = [
	"csv folder",
	"home stations",
	"office stations",
];

const renderSettings = () => render(<Settings isEditorOpen />);

const Settings = ({ isEditorOpen }: { isEditorOpen: boolean }) => (
	<ThemeColourProvider colour={SAVED_CONFIG.themeColour}>
		<ShownColour />
		{isEditorOpen && (
			<ConfigEditor config={SAVED_CONFIG} saveConfig={() => {}} />
		)}
	</ThemeColourProvider>
);

const ShownColour = () => <Text>Shown colour: {useThemeColour()}</Text>;

const focusThemeColourField = async (stdin: {
	write: (data: string) => void;
}) => {
	await letEffectsRun();
	for (const _field of [...FIELDS_BEFORE_THEME_COLOUR, "theme colour"]) {
		stdin.write(KEYS.tab);
		await letEffectsRun();
	}
	await letEffectsRun();
};
