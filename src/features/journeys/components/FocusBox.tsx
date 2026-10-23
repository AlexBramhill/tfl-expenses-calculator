import { Box } from "ink";
import type { ReactNode } from "react";
import useIsFullscreen from "../hooks/useIsFullscreen";

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
	const isFullscreen = useIsFullscreen();
	const isHiddenByFullscreen = isFullscreen && !isFocused;

	return (
		<Box
			flexDirection="column"
			borderStyle="round"
			borderDimColor={isFocused ? undefined : true}
			borderColor={isFocused ? "green" : undefined}
			padding={1}
			minWidth={minWidth}
			flexGrow={canGrow || isFullscreen ? 1 : 0}
			display={isHiddenByFullscreen ? "none" : "flex"}
		>
			{children}
		</Box>
	);
}
