import { Box } from "ink";
import { render } from "ink-testing-library";
import { describe, expect, it, vi } from "vitest";
import { FIXTURE_CONFIG } from "@/test/fixtures";
import { KEYS } from "@/test/keys";
import { letEffectsRun } from "@/test/letEffectsRun";
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
			"1/3 ↑ | ↓ to select",
		]);

		expect(lastFrame()).toMatchSnapshot();
	});

	it("moves the selection one journey at a time, turning the page after the last", async () => {
		const { lastFrame, stdin } = renderExplorer();
		await focusJourneyDetails(lastFrame, stdin);

		await pressRepeatedly(stdin, KEYS.arrowDown, JOURNEYS_PER_PAGE - 1);
		expect(lastFrame()).toContain("1/3 ↑ | ↓ to select");
		stdin.write(KEYS.arrowDown);

		await waitForScreenShowing(lastFrame, ["2/3 ↑ | ↓ to select"]);
	});

	it("jumps a page of journeys with the right arrow", async () => {
		const { lastFrame, stdin } = renderExplorer();
		await focusJourneyDetails(lastFrame, stdin);

		stdin.write(KEYS.arrowRight);

		await waitForScreenShowing(lastFrame, ["2/3 ↑ | ↓ to select"]);
	});

	it("groups journeys by file after pressing t", async () => {
		const { lastFrame, stdin } = renderExplorer();
		await waitForScreenShowing(lastFrame, FIRST_MONTH_SELECTED);

		stdin.write("t");
		await waitForScreenShowing(lastFrame, [
			"❯ journeys.csv ✔",
			"60 total trips",
			"1/6 ↑ | ↓ to select",
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
	"1/3 ↑ | ↓ to select",
];

const JOURNEYS_PER_PAGE = 17;

const renderExplorer = () =>
	render(
		<Box height={TERMINAL_ROWS}>
			<JourneyExplorer config={FIXTURE_CONFIG} />
		</Box>,
	);

const focusJourneyDetails = async (
	lastFrame: () => string | undefined,
	stdin: { write: (data: string) => void },
) => {
	await waitForScreenShowing(lastFrame, FIRST_MONTH_SELECTED);
	stdin.write(KEYS.shiftTab);
	await waitForScreenHiding(lastFrame, ["❯ Jul 26 ✔"]);
};

const pressRepeatedly = async (
	stdin: { write: (data: string) => void },
	key: string,
	times: number,
) => {
	for (let press = 0; press < times; press++) {
		stdin.write(key);
		await letEffectsRun();
	}
};

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
