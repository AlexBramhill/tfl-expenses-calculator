import { Box, type TextProps } from "ink";
import { Line } from "@/components/Line";
import PagedList from "@/components/PagedList";
import { columnWidth, truncate } from "@/utils/tableCells";

export type TableColumn<T> = {
	header: string;
	getValue: (row: T) => string;
	maxWidth?: number;
};

export type RowStyle = Pick<TextProps, "color" | "dimColor">;

const SEPARATOR = " | ";

const UNSTYLED: RowStyle = {};

function Table<T>({
	columns,
	rows,
	getRowKey,
	getRowStyle = () => UNSTYLED,
	isFocused,
	isSelectionVisible = isFocused,
	onSelectRow,
}: {
	columns: TableColumn<T>[];
	rows: T[];
	getRowKey: (row: T) => string;
	getRowStyle?: (row: T) => RowStyle;
	isFocused: boolean;
	isSelectionVisible?: boolean;
	onSelectRow?: (row: T) => void;
}) {
	const widths = columns.map((column) =>
		columnWidth(rows.map(column.getValue), column.maxWidth),
	);

	return (
		<Box flexDirection="column" flexGrow={1}>
			<Line bold underline>
				{getHeading(columns, widths)}
			</Line>
			<PagedList
				items={rows}
				isFocused={isFocused}
				mode="select"
				onSelect={onSelectRow}
			>
				{(rowsOnPage, selectedRow) => {
					const isHighlighted = (row: T) =>
						isSelectionVisible && row === selectedRow;
					return rowsOnPage.map((row) => (
						<Line
							key={getRowKey(row)}
							{...getRowStyle(row)}
							inverse={isHighlighted(row)}
						>
							{getRowText(columns, widths, row)}
						</Line>
					));
				}}
			</PagedList>
		</Box>
	);
}

const getHeading = <T,>(columns: TableColumn<T>[], widths: number[]) =>
	columns
		.map((column, index) => column.header.padEnd(widths[index] ?? 0))
		.join(SEPARATOR);

const getRowText = <T,>(columns: TableColumn<T>[], widths: number[], row: T) =>
	columns
		.map((column, index) => paddedCell(column, row, widths[index] ?? 0))
		.join(SEPARATOR);

const paddedCell = <T,>(column: TableColumn<T>, row: T, width: number) =>
	truncate(column.getValue(row), column.maxWidth).padEnd(width);

export default Table;
