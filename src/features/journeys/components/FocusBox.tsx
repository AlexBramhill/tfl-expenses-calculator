import { Box } from "ink";
import type { ReactNode } from "react";

export function FocusBox({
	children,
	isFocused,
}: {
	children: ReactNode;
	isFocused: boolean;
}) {
	return (
		<Box
			flexDirection="column"
			borderStyle="round"
			borderDimColor={isFocused ? undefined : true}
			borderColor={isFocused ? "green" : undefined}
			padding={1}
		>
			{children}
		</Box>
	);
}
