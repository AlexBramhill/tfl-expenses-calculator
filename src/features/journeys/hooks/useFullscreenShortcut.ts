import { useInput } from "ink";

const FULLSCREEN_SHORTCUT_KEY = "f";

const useFullscreenShortcut = (onToggle: () => void) => {
	useInput((input) => {
		if (input === FULLSCREEN_SHORTCUT_KEY) onToggle();
	});
};

export default useFullscreenShortcut;
