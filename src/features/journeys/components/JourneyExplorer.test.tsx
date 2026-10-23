import { Box } from "ink";
import { render } from "ink-testing-library";
import { describe, expect, it, vi } from "vitest";
import { FIXTURE_CONFIG } from "@/test/fixtures";
import { KEYS } from "@/test/keys";
import { TERMINAL_ROWS } from "@/test/terminalSize";
import JourneyExplorer from "./JourneyExplorer";

describe("JourneyExplorer", () => {
	it("summarises the first month of journeys", async () => {
		const { lastFrame } = renderExplorer();

		await waitForScreenShowing(lastFrame, FIRST_MONTH_SELECTED);

		expect(lastFrame()).toMatchSnapshot();
	});

	it("summarises the next month when it is selected", async () => {
		const { lastFrame, stdin } = renderExplorer();
		await waitForScreenShowing(lastFrame, FIRST_MONTH_SELECTED);

		stdin.write(KEYS.arrowDown);
		await waitForScreenShowing(lastFrame, ["❯ Aug 26"]);
		stdin.write(KEYS.enter);
		await waitForScreenShowing(lastFrame, [
			"❯ Aug 26 ✔",
			"28 total trips",
			"1/3 ↑ | ↓ to paginate",
		]);

		expect(lastFrame()).toMatchSnapshot();
	});

	it("groups journeys by file after pressing t", async () => {
		const { lastFrame, stdin } = renderExplorer();
		await waitForScreenShowing(lastFrame, FIRST_MONTH_SELECTED);

		stdin.write("t");
		await waitForScreenShowing(lastFrame, [
			"❯ journeys.csv ✔",
			"60 total trips",
			"1/6 ↑ | ↓ to paginate",
		]);

		expect(lastFrame()).toMatchSnapshot();
	});

	it("shows only the focused panel after pressing f", async () => {
		const { lastFrame, stdin } = renderExplorer();
		await waitForScreenShowing(lastFrame, FIRST_MONTH_SELECTED);

		stdin.write("f");
		await waitForScreenHiding(lastFrame, ["32 total trips"]);

		expect(lastFrame()).toContain("❯ Jul 26 ✔");
	});

	it("keeps fullscreen on the newly focused panel after pressing tab", async () => {
		const { lastFrame, stdin } = renderExplorer();
		await waitForScreenShowing(lastFrame, FIRST_MONTH_SELECTED);

		stdin.write("f");
		await waitForScreenHiding(lastFrame, ["32 total trips"]);
		stdin.write(KEYS.tab);
		await waitForScreenShowing(lastFrame, ["32 total trips"]);

		expect(lastFrame()).not.toContain("❯ Jul 26 ✔");
	});

	it("shows all panels again after pressing f twice", async () => {
		const { lastFrame, stdin } = renderExplorer();
		await waitForScreenShowing(lastFrame, FIRST_MONTH_SELECTED);

		stdin.write("f");
		await waitForScreenHiding(lastFrame, ["32 total trips"]);
		stdin.write("f");

		await waitForScreenShowing(lastFrame, FIRST_MONTH_SELECTED);
	});
});

const FIRST_MONTH_SELECTED = [
	"❯ Jul 26 ✔",
	"32 total trips",
	"1/3 ↑ | ↓ to paginate",
];

const renderExplorer = () =>
	render(
		<Box height={TERMINAL_ROWS}>
			<JourneyExplorer config={FIXTURE_CONFIG} />
		</Box>,
	);

const waitForScreenShowing = async (
	lastFrame: () => string | undefined,
	texts: string[],
) => {
	await vi.waitFor(() => {
		for (const text of texts) {
			expect(lastFrame()).toContain(text);
		}
	});
	await letEffectsRun();
};

const waitForScreenHiding = async (
	lastFrame: () => string | undefined,
	texts: string[],
) => {
	await vi.waitFor(() => {
		for (const text of texts) {
			expect(lastFrame()).not.toContain(text);
		}
	});
	await letEffectsRun();
};

// Ink attaches key listeners in effects, which run just after a frame is drawn.
const letEffectsRun = () => new Promise((resolve) => setTimeout(resolve, 0));
