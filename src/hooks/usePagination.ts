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
	const lastPage = totalPages - 1;
	const [requestedPage, setRequestedPage] = useState(0);
	const currentPage = Math.min(requestedPage, lastPage);

	useInput((_input, key) => {
		if (key.downArrow && isFocused)
			setRequestedPage(Math.min(currentPage + 1, lastPage));
		if (key.upArrow && isFocused)
			setRequestedPage(Math.max(currentPage - 1, 0));
	});

	const itemsOnPage = items.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage,
	);
	return { currentPage, totalPages, itemsOnPage };
};

export default usePagination;
