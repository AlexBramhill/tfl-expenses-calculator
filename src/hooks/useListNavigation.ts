import { useInput } from "ink";
import { useMemo, useState } from "react";

const useListNavigation = <TItem, TKey>(
	list: TItem[],
	getListItemKey: (item: TItem) => TKey,
) => {
	const [currentKey, setCurrentKey] = useState<TKey>();

	useInput((_input, key) => {
		if (key.downArrow) moveToNextItem();
		if (key.upArrow) moveToPreviousItem();
	});

	var currentItem = useMemo(() => {
		if (list.length === 0) {
			return undefined;
		}
		const currentIndex = list.findIndex(
			(x) => getListItemKey(x) === currentKey,
		);
		if (currentIndex === -1) {
			return list[0];
		}
		return list[currentIndex];
	}, [list, currentKey, getListItemKey]);

	const moveToNextItem = () => {
		if (list.length === 0) return;

		setCurrentKey((oldKey) => {
			const currentIndex = list.findIndex((x) => getListItemKey(x) === oldKey);
			const nextIndex = (currentIndex + 1) % list.length;
			return getListItemKey(list[nextIndex]);
		});
	};

	const moveToPreviousItem = () => {
		if (list.length === 0) return;

		setCurrentKey((oldKey) => {
			const foundIndex = list.findIndex((x) => getListItemKey(x) === oldKey);
			const currentIndex = foundIndex === -1 ? 0 : foundIndex;
			const previousIndex = (currentIndex - 1 + list.length) % list.length;
			return getListItemKey(list[previousIndex]);
		});
	};

	return { currentItem };
};

export default useListNavigation;
