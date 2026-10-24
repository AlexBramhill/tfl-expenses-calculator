import { useInput } from "ink";

const FULLSCREEN_SHORTCUT_KEY = "f";

const useFullscreenShortcut = (onToggle: () => void, isActive: boolean) => {
	useInput(
		(input) => {
			if (input === FULLSCREEN_SHORTCUT_KEY) onToggle();
		},
		{ isActive },
	);
};

export default useFullscreenShortcut;
