import { useInput } from "ink";

const TOGGLE_GROUPING_KEY = "t";

const useToggleGroupingKey = (onToggle: () => void) => {
	useInput((input) => {
		if (input === TOGGLE_GROUPING_KEY) onToggle();
	});
};

export default useToggleGroupingKey;
