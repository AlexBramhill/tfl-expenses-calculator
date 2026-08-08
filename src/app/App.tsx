import { Box, Text, useWindowSize } from "ink";
import { useState } from "react";
import { LogStream } from "@/features/logs";
import ConfigScreen from "../screens/Config";
import Help from "../screens/Help";
import Home from "../screens/Home";
import useAppInput from "./useAppInput";
import useRouter from "./useRouter";

const App = () => {
	const { currentPage, previousPage, canGoBack, goToPage, goBack } =
		useRouter();

	const [showLogs, setShowLogs] = useState<boolean>(false);
	const { rows } = useWindowSize();
	useAppInput({
		currentPage,
		goToPage,
		goBack,
		canGoBack,
		onToggleLogs: () => setShowLogs((prev) => !prev),
	});

	if (showLogs) {
		return (
			<Box>
				<LogStream />
			</Box>
		);
	}

	return (
		<Box flexDirection="column" height={rows}>
			<Box flexDirection="column" padding={1}>
				<Text bold color="green" underline>
					TFL CSV Expense Parser
				</Text>
				<Text dimColor>
					{currentPage === "settings"
						? "esc=back"
						: `q=quit | w=home | s=settings | r=help${canGoBack ? ` | t=back (${previousPage})` : ""}`}
				</Text>
			</Box>
			<Box flexDirection="column" padding={1}>
				{currentPage === "home" && <Home />}
				{currentPage === "settings" && <ConfigScreen />}
				{currentPage === "help" && <Help />}
			</Box>
		</Box>
	);
};

export default App;
