import { useInput } from "ink";
import type { Page } from "./useRouter";

const useAppInput = ({
	currentPage,
	goToPage,
	goBack,
	canGoBack,
	onToggleLogs,
}: {
	currentPage: Page;
	goToPage: (page: Page) => void;
	goBack: () => void;
	canGoBack: boolean;
	onToggleLogs: () => void;
}) => {
	useInput((input, key) => {
		if (key.escape && canGoBack) {
			goBack();
			return;
		}

		// Settings has editable text fields, so single-letter shortcuts would
		// fire while typing (e.g. "q" would quit mid-edit). Escape above is
		// the only way back while this page is focused.
		if (currentPage === "settings") return;

		if (input === "q") process.exit();
		if (input === "w") goToPage("home");
		if (input === "s") goToPage("settings");
		if (input === "r") goToPage("help");
		if (input === "t" && canGoBack) goBack();
		if (input === "d") onToggleLogs();
	});
};

export default useAppInput;
