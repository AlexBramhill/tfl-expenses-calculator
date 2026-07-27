import { useInput } from "ink";
import { useEffect, useState } from "react";

const useListNavigation = (filePaths: string[]) => {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	useEffect(() => {
		if (filePaths.length === 0) return;
		if (selectedItem != null && filePaths.includes(selectedItem)) return;
		setSelectedItem(filePaths[0]);
	}, [filePaths, selectedItem]);

	useInput((_input, key) => {
		if (!selectedItem) return;

		const currentIndex = filePaths.indexOf(selectedItem);

		if (key.downArrow) {
			setSelectedItem(
				filePaths[Math.min(currentIndex + 1, filePaths.length - 1)],
			);
		}
		if (key.upArrow) {
			setSelectedItem(filePaths[Math.max(currentIndex - 1, 0)]);
		}
	});

	return { currentSelectedFile: selectedItem };
};

export default useListNavigation;
