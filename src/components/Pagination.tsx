import { Box, type DOMElement, useBoxMetrics } from "ink";
import { type ReactNode, useRef } from "react";
import { Line } from "@/components/Line";
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
			<Line dimColor>
				{currentPage + 1}/{totalPages} ↑ | ↓ to paginate
			</Line>
		</Box>
	);
}

export default Pagination;
