import { useState } from "react";
import {
	getItemsOnPage,
	getPageOfRow,
	getTotalPages,
} from "@/utils/pagination";

const usePagination = <T>({
	items,
	rowsPerPage,
}: {
	items: T[];
	rowsPerPage: number;
}) => {
	const { currentRowIndex, moveByRowCount } = useCurrentRowIndex(items.length);
	const pageIndex = getPageOfRow(currentRowIndex, rowsPerPage);

	return {
		itemsOnPage: getItemsOnPage(items, pageIndex, rowsPerPage),
		selectedItem: items[currentRowIndex],
		pageIndex,
		totalPages: getTotalPages(items.length, rowsPerPage),
		moveByRowCount,
		moveByPageCount: (pagesToMove: number) =>
			moveByRowCount(pagesToMove * rowsPerPage),
	};
};

const useCurrentRowIndex = (rowCount: number) => {
	const [requestedRowIndex, setRequestedRowIndex] = useState(0);

	const moveByRowCount = (rowsToMove: number) =>
		setRequestedRowIndex(
			(requested) => clampRowIndex(requested, rowCount) + rowsToMove,
		);

	return {
		currentRowIndex: clampRowIndex(requestedRowIndex, rowCount),
		moveByRowCount,
	};
};

const clampRowIndex = (rowIndex: number, rowCount: number) =>
	Math.min(Math.max(rowIndex, 0), Math.max(rowCount - 1, 0));

export default usePagination;
