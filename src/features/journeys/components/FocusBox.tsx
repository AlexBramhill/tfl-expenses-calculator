import { Box } from "ink";
import type { ReactNode } from "react";
import { useThemeColour } from "@/components/ThemeColour";
import useIsFullscreen from "@/features/journeys/hooks/useIsFullscreen";

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
	const themeColour = useThemeColour();
	const isHiddenByFullscreen = isFullscreen && !isFocused;

	return (
		<Box
			flexDirection="column"
			borderStyle="round"
			borderDimColor={isFocused ? undefined : true}
			borderColor={isFocused ? themeColour : undefined}
			paddingX={1}
			minWidth={minWidth}
			flexGrow={canGrow || isFullscreen ? 1 : 0}
			display={isHiddenByFullscreen ? "none" : "flex"}
		>
			{children}
		</Box>
	);
}
