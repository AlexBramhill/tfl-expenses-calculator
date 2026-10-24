import { Box, Text } from "ink";
import { render } from "ink-testing-library";
import { describe, expect, it, vi } from "vitest";
import { KEYS } from "@/test/keys";
import { letEffectsRun } from "@/test/letEffectsRun";
import Modal from "./Modal";

describe("Modal", () => {
	it("shows its title and content", () => {
		const { lastFrame } = renderModal();

		expect(lastFrame()).toContain("Journey");
		expect(lastFrame()).toContain("Home Station to Office Station");
	});

	it("hides the screen behind it", () => {
		const { lastFrame } = renderModal();

		const titleLine = findLineContaining(lastFrame(), "Journey");
		expect(insideBorders(titleLine)).not.toContain(BACKGROUND_CHARACTER);
	});

	it("closes when escape is pressed", async () => {
		const onClose = vi.fn();
		const { stdin } = renderModal(onClose);
		await letEffectsRun();

		stdin.write(KEYS.escape);

		await vi.waitFor(() => expect(onClose).toHaveBeenCalledOnce());
	});
});

const BACKGROUND_CHARACTER = "x";

const BACKGROUND = Array(9).fill(BACKGROUND_CHARACTER.repeat(50)).join("\n");

const renderModal = (onClose = () => {}) =>
	render(
		<Box width={50} height={9}>
			<Text>{BACKGROUND}</Text>
			<Modal title="Journey" onClose={onClose}>
				<Text>Home Station to Office Station</Text>
			</Modal>
		</Box>,
	);

const findLineContaining = (frame: string | undefined, text: string) =>
	frame?.split("\n").find((line) => line.includes(text)) ?? "";

const insideBorders = (line: string) =>
	line.slice(line.indexOf("│") + 1, line.lastIndexOf("│"));
