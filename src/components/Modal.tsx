import { Box, useFocus, useFocusManager, useInput } from "ink";
import { type ReactNode, useEffect, useState } from "react";
import { Line } from "@/components/Line";
import { useThemeColour } from "@/components/ThemeColour";

const MODAL_FOCUS_ID = "modal";

function Modal({
	title,
	onClose,
	children,
}: {
	title: string;
	onClose: () => void;
	children: ReactNode;
}) {
	useTakeFocusWhileOpen();
	useCloseOnEscape(onClose);
	const themeColour = useThemeColour();

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
				borderColor={themeColour}
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

export const useIsModalOpen = () =>
	useFocusManager().activeId === MODAL_FOCUS_ID;

const useTakeFocusWhileOpen = () => {
	useFocus({ id: MODAL_FOCUS_ID });
	const { activeId, disableFocus, enableFocus, focus } = useFocusManager();
	const [focusBehindModal] = useState(activeId);

	useEffect(() => {
		disableFocus();
		focus(MODAL_FOCUS_ID);

		return () => {
			enableFocus();
			if (focusBehindModal) focus(focusBehindModal);
		};
	}, [focusBehindModal, disableFocus, enableFocus, focus]);
};

const useCloseOnEscape = (onClose: () => void) => {
	useInput((_input, key) => {
		if (key.escape) onClose();
	});
};

export default Modal;
