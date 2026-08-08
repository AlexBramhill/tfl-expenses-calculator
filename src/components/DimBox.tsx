import { Box } from "ink";
import type { ReactNode } from "react";

export function DimBox({ children }: { children: ReactNode }) {
	return (
		<Box flexDirection="column" borderStyle="round" borderDimColor padding={1}>
			{children}
		</Box>
	);
}
