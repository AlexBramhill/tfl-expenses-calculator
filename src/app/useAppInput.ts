import { useApp, useFocusManager, useInput } from "ink";
import type { Page } from "@/app/useRouter";
import { useIsModalOpen } from "@/components/Modal";
import { isTextFieldId } from "@/features/config";

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
	const isModalOpen = useIsModalOpen();
	const { exit } = useApp();

	useInput(
		(input, key) => {
			if (key.escape && canGoBack) goBack();
			if (isTextInputActive) {
				return;
			}

			if (input === "q") exit();
			if (input === "w") goToPage("home");
			if (input === "s") goToPage("settings");
			if (input === "r") goToPage("help");
			if (input === "d") onToggleLogs();
		},
		{ isActive: !isModalOpen },
	);
};

export default useAppInput;
