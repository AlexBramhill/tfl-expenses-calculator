export const getTotalPages = (rowCount: number, rowsPerPage: number) =>
	Math.max(1, Math.ceil(rowCount / rowsPerPage));

export const getPageOfRow = (rowIndex: number, rowsPerPage: number) =>
	Math.floor(rowIndex / rowsPerPage);

export const getItemsOnPage = <T>(
	items: T[],
	pageIndex: number,
	rowsPerPage: number,
) => items.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage);
