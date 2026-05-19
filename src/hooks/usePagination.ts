import { useInput } from "ink";
import { useState } from "react";

const usePagination = <T>({
	items,
	itemsPerPage,
}: {
	items: T[];
	itemsPerPage: number;
}): {
	currentPage: number;
	totalPages: number;
	itemsOnPage: T[];
} => {
	const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
	const [currentPage, setCurrentPage] = useState(0);

	useInput((_input, key) => {
		if (key.rightArrow) setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
		if (key.leftArrow) setCurrentPage((p) => Math.max(p - 1, 0));
	});

	const itemsOnPage = items.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage,
	);
	return { currentPage, totalPages, itemsOnPage };
};

export default usePagination;
