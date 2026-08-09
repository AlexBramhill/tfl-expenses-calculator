import { Box } from "ink";
import type { ReactNode } from "react";

export function SpacedBox({ children }: { children: ReactNode }) {
	return (
		<Box flexDirection="column" padding={2}>
			{children}
		</Box>
	);
}
