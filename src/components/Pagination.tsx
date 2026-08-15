import { Box, type DOMElement, measureElement, Text, useWindowSize } from "ink";
import { type ReactNode, useEffect, useRef, useState } from "react";
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
	const { rows } = useWindowSize();
	const containerRef = useRef<DOMElement>(null);
	const [itemsPerPage, setItemsPerPage] = useState(1);

	// biome-ignore lint/correctness/useExhaustiveDependencies: row change means terminal height change
	useEffect(() => {
		if (!containerRef.current) return;
		const { height } = measureElement(containerRef.current);
		setItemsPerPage(Math.max(1, height - FOOTER_ROWS));
	}, [rows]);

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
