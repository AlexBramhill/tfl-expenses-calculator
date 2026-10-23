import { useInput } from "ink";

const GROUPING_SHORTCUT_KEY = "t";

const useGroupingShortcut = (onToggle: () => void) => {
	useInput((input) => {
		if (input === GROUPING_SHORTCUT_KEY) onToggle();
	});
};

export default useGroupingShortcut;
