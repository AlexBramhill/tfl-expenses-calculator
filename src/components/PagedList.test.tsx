import { Box, Text } from "ink";
import { render } from "ink-testing-library";
import { describe, expect, it, vi } from "vitest";
import PagedList from "@/components/PagedList";
import { KEYS } from "@/test/keys";
import { letEffectsRun } from "@/test/letEffectsRun";

describe("PagedList", () => {
	it("turns the page with the down arrow", async () => {
		const { lastFrame, stdin } = renderList();
		await vi.waitFor(() => expect(lastFrame()).toContain("1/2 ↑ | ↓ to page"));
		await letEffectsRun();

		stdin.write(KEYS.arrowDown);

		await vi.waitFor(() => {
			expect(lastFrame()).toContain("2/2 ↑ | ↓ to page");
			expect(lastFrame()).not.toContain("charlie");
			expect(lastFrame()).toContain("delta");
		});
	});
});

const ITEMS = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot"];

const ROWS_PER_PAGE_PLUS_FOOTER = 4;

const renderList = () =>
	render(
		<Box height={ROWS_PER_PAGE_PLUS_FOOTER} flexDirection="column">
			<PagedList items={ITEMS} isFocused>
				{(itemsOnPage) =>
					itemsOnPage.map((item) => <Text key={item}>{item}</Text>)
				}
			</PagedList>
		</Box>,
	);
