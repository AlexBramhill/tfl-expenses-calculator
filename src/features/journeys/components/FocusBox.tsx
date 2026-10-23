import { Box } from "ink";
import type { ReactNode } from "react";

export function FocusBox({
	children,
	isFocused,
	canGrow,
	minWidth,
}: {
	children: ReactNode;
	isFocused: boolean;
	canGrow?: boolean;
	minWidth?: number;
}) {
	return (
		<Box
			flexDirection="column"
			borderStyle="round"
			borderDimColor={isFocused ? undefined : true}
			borderColor={isFocused ? "green" : undefined}
			padding={1}
			minWidth={minWidth}
			flexGrow={canGrow ? 1 : 0}
		>
			{children}
		</Box>
	);
}
