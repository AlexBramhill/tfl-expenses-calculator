import { Box, Text } from "ink";
import type { ReactNode } from "react";
import usePagination from "../hooks/usePagination";

function Pagination<T>({
	items,
	itemsPerPage,
	isFocused,
	children,
}: {
	items: T[];
	itemsPerPage: number;
	isFocused: boolean;
	children: (itemsOnPage: T[]) => ReactNode;
}) {
	const { currentPage, totalPages, itemsOnPage } = usePagination<T>({
		items,
		itemsPerPage,
		isFocused,
	});

	return (
		<Box flexDirection="column" flexGrow={1}>
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
