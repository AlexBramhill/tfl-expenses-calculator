import { useInput } from "ink";

const GROUPING_SHORTCUT_KEY = "t";

const useGroupingShortcut = (onToggle: () => void, isActive: boolean) => {
	useInput(
		(input) => {
			if (input === GROUPING_SHORTCUT_KEY) onToggle();
		},
		{ isActive },
	);
};

export default useGroupingShortcut;
