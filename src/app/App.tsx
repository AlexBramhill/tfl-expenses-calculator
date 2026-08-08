import { Box, Text, useWindowSize } from "ink";
import { useState } from "react";
import { ConfigProvider } from "@/features/config";
import { LogStream } from "@/features/logs/components/LogStream";
import ConfigScreen from "../screens/ConfigScreen";
import HelpScreen from "../screens/HelpScreen";
import HomeScreen from "../screens/HomeScreen";
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
		<ConfigProvider>
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
					{currentPage === "home" && <HomeScreen />}
					{currentPage === "settings" && <ConfigScreen />}
					{currentPage === "help" && <HelpScreen />}
				</Box>
			</Box>
		</ConfigProvider>
	);
};

export default App;
