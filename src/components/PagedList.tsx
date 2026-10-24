import { Box, type DOMElement, useBoxMetrics } from "ink";
import { type ReactNode, type RefObject, useRef } from "react";
import { Line } from "@/components/Line";
import useListNavigationKeys from "@/hooks/useListNavigationKeys";
import usePagination from "@/hooks/usePagination";

const FOOTER_ROWS = 1;

function PagedList<T>({
	items,
	isFocused,
	mode = "page",
	onSelect,
	children,
}: {
	items: T[];
	isFocused: boolean;
	mode?: "page" | "select";
	onSelect?: (item: T) => void;
	children: (itemsOnPage: T[], selectedItem: T | undefined) => ReactNode;
}) {
	const isSelecting = mode === "select";
	const containerRef = useRef<DOMElement>(null);
	const rowsPerPage = useRowsPerPage(containerRef);
	const {
		itemsOnPage,
		selectedItem,
		pageIndex,
		totalPages,
		moveByRowCount,
		moveByPageCount,
	} = usePagination({ items, rowsPerPage });

	const openSelectedItem = () => {
		if (isSelecting && selectedItem !== undefined) onSelect?.(selectedItem);
	};

	useListNavigationKeys({
		isFocused,
		onMoveRows: isSelecting ? moveByRowCount : moveByPageCount,
		onMovePages: moveByPageCount,
		onChoose: openSelectedItem,
	});

	const footer = getFooterText({ isSelecting, pageIndex, totalPages });

	return (
		<Box ref={containerRef} flexDirection="column" flexGrow={1}>
			<Box flexDirection="column" flexGrow={1}>
				{children(itemsOnPage, isSelecting ? selectedItem : undefined)}
			</Box>
			{footer && <Line dimColor>{footer}</Line>}
		</Box>
	);
}

const useRowsPerPage = (containerRef: RefObject<DOMElement | null>) => {
	const { height } = useBoxMetrics(containerRef);
	return Math.max(1, height - FOOTER_ROWS);
};

const getFooterText = ({
	isSelecting,
	pageIndex,
	totalPages,
}: {
	isSelecting: boolean;
	pageIndex: number;
	totalPages: number;
}) => {
	const hasManyPages = totalPages > 1;
	const pageCounter = hasManyPages ? `${pageIndex + 1}/${totalPages}` : "";
	const keyHint = getKeyHint(isSelecting, hasManyPages);

	return `${pageCounter} ${keyHint}`.trim();
};

const getKeyHint = (isSelecting: boolean, hasManyPages: boolean) => {
	if (isSelecting && hasManyPages) return "↑ | ↓ to select, ← | → to page";
	if (isSelecting) return "↑ | ↓ to select";
	if (hasManyPages) return "↑ | ↓ to page";
	return "";
};

export default PagedList;
