import { useInput } from "ink";

type Direction = 1 | -1;

const useListNavigationKeys = ({
	isFocused,
	onMoveRows,
	onMovePages,
}: {
	isFocused: boolean;
	onMoveRows: (direction: Direction) => void;
	onMovePages: (direction: Direction) => void;
}) => {
	useInput(
		(_input, key) => {
			if (key.downArrow) onMoveRows(1);
			if (key.upArrow) onMoveRows(-1);
			if (key.rightArrow) onMovePages(1);
			if (key.leftArrow) onMovePages(-1);
		},
		{ isActive: isFocused },
	);
};

export default useListNavigationKeys;
