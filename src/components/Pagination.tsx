import { Box, type DOMElement, Text, useBoxMetrics } from "ink";
import { type ReactNode, useRef } from "react";
import usePagination from "@/hooks/usePagination";

const FOOTER_ROWS = 1;

function Pagination<T>({
	items,
	isFocused,
	children,
}: {
	items: T[];
	isFocused: boolean;
	children: (itemsOnPage: T[]) => ReactNode;
}) {
	const containerRef = useRef<DOMElement>(null);
	const { height } = useBoxMetrics(containerRef);
	const itemsPerPage = Math.max(1, height - FOOTER_ROWS);

	const { currentPage, totalPages, itemsOnPage } = usePagination<T>({
		items,
		itemsPerPage,
		isFocused,
	});

	return (
		<Box ref={containerRef} flexDirection="column" flexGrow={1}>
			<Box flexDirection="column" flexGrow={1}>
				{children(itemsOnPage)}
			</Box>
			<Text dimColor>
				{currentPage + 1}/{totalPages} ↑ | ↓ to paginate
			</Text>
		</Box>
	);
}

export default Pagination;
