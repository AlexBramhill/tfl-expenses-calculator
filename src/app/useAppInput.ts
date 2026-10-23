import { useFocusManager, useInput } from "ink";
import { isTextFieldId } from "@/features/config";
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
	const { activeId } = useFocusManager();
	const isTextInputActive = isTextFieldId(activeId);

	useInput((input, key) => {
		if (key.escape && canGoBack) goBack();
		if (isTextInputActive) {
			return;
		}

		if (input === "q") process.exit();
		if (input === "w") goToPage("home");
		if (input === "s") goToPage("settings");
		if (input === "r") goToPage("help");
		if (input === "d") onToggleLogs();
	});
};

export default useAppInput;
