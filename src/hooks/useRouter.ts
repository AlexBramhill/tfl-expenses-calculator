import { useState } from "react";
import { logDebug } from "../logPublisher";

type Page = "home" | "settings";

type UseRouterReturn = {
	currentPage: Page;
	previousPage?: Page;
	goToPage: (page: Page) => void;
	canGoBack: boolean;
	goBack: () => void;
};

const useRouter = (initial: Page = "home"): UseRouterReturn => {
	const [history, setHistory] = useState<Page[]>([initial]);

	const goToPage = (page: Page) => {
		logDebug(`Navigating to ${page} from ${history[history.length - 1]}`);
		setHistory((prev) => {
			if (prev[prev.length - 1] === page) {
				return prev;
			}
			return [...prev, page];
		});
	};

	const goBack = () => {
		logDebug(`Navigating to ${history.length - 1}`);
		setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
	};

	return {
		currentPage: history[history.length - 1],
		previousPage: history[history.length - 2],
		canGoBack: history.length > 1,
		goToPage: goToPage,
		goBack: goBack,
	};
};

export default useRouter;
