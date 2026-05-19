import { useInput } from "ink";
import { useEffect, useState } from "react";

const useFileNavigation = (filePaths: string[]) => {
	const [currentSelectedFile, setCurrentSelectedFile] = useState<string | null>(
		null,
	);

	useEffect(() => {
		if (filePaths.length === 0) return;
		if (currentSelectedFile != null && filePaths.includes(currentSelectedFile))
			return;
		setCurrentSelectedFile(filePaths[0]);
	}, [filePaths, currentSelectedFile]);

	useInput((_input, key) => {
		if (!currentSelectedFile) return;

		const currentIndex = filePaths.indexOf(currentSelectedFile);

		if (key.downArrow) {
			setCurrentSelectedFile(
				filePaths[Math.min(currentIndex + 1, filePaths.length - 1)],
			);
		}
		if (key.upArrow) {
			setCurrentSelectedFile(filePaths[Math.max(currentIndex - 1, 0)]);
		}
	});

	return { currentSelectedFile };
};

export default useFileNavigation;
