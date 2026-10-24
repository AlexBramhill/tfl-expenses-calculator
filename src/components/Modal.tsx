import { Box, useInput } from "ink";
import type { ReactNode } from "react";
import { Line } from "@/components/Line";

function Modal({
	title,
	onClose,
	children,
}: {
	title: string;
	onClose: () => void;
	children: ReactNode;
}) {
	useInput((_input, key) => {
		if (key.escape) onClose();
	});

	return (
		<Box
			position="absolute"
			width="100%"
			height="100%"
			justifyContent="center"
			alignItems="center"
		>
			<Box
				flexDirection="column"
				borderStyle="round"
				borderColor="green"
				backgroundColor="default"
				paddingX={1}
			>
				<Line bold>{title}</Line>
				{children}
				<Line dimColor>esc to close</Line>
			</Box>
		</Box>
	);
}

export default Modal;
