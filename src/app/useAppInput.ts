import { useInput } from "ink";
import type { Page } from "./useRouter";

const useAppInput = ({
	goToPage,
	goBack,
	canGoBack,
	onToggleLogs,
}: {
	goToPage: (page: Page) => void;
	goBack: () => void;
	canGoBack: boolean;
	onToggleLogs: () => void;
}) => {
	useInput((input) => {
		if (input === "q") process.exit();
		if (input === "w") goToPage("home");
		if (input === "r") goToPage("help");
		if (input === "t" && canGoBack) goBack();
		if (input === "d") onToggleLogs();
	});
};

export default useAppInput;
