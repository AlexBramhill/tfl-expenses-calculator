import { useFocus } from "ink";

const useFocusBox = (autoFocus?: boolean): boolean => {
	const { isFocused } = useFocus({ autoFocus });
	return isFocused;
};

export default useFocusBox;
