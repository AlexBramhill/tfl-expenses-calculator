import { useInput } from "ink";
import { useState } from "react";

const usePagination = <T>({
	items,
	itemsPerPage,
	isFocused,
}: {
	items: T[];
	itemsPerPage: number;
	isFocused: boolean;
}): {
	currentPage: number;
	totalPages: number;
	itemsOnPage: T[];
} => {
	const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
	const [currentPage, setCurrentPage] = useState(0);

	useInput((_input, key) => {
		if (key.downArrow && isFocused)
			setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
		if (key.upArrow && isFocused) setCurrentPage((p) => Math.max(p - 1, 0));
	});

	const itemsOnPage = items.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage,
	);
	return { currentPage, totalPages, itemsOnPage };
};

export default usePagination;
