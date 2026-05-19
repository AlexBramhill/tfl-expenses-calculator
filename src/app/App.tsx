import { Box, Text, useWindowSize } from "ink";
import { useState } from "react";
import { LogStream } from "../components/LogStream";
import useAppInput from "../hooks/useAppInput";
import useRouter from "../hooks/useRouter";
import Help from "../screens/Help";
import Home from "../screens/Home";

const App = () => {
	const { currentPage, previousPage, canGoBack, goToPage, goBack } =
		useRouter();

	const [showLogs, setShowLogs] = useState<boolean>(false);
	const { rows } = useWindowSize();
	useAppInput({
		goToPage,
		goBack,
		canGoBack,
		onToggleLogs: () => setShowLogs((prev) => !prev),
	});

	if (showLogs)
		<Box>
			<LogStream />
		</Box>;

	if (currentPage === "help") <Help />;

	return (
		<Box flexDirection="column" height={rows}>
			<Box flexDirection="column" padding={1}>
				<Text bold color="green" underline>
					TFL CSV Expense Parser
				</Text>
				<Text dimColor>
					q=quit | w=home | r=help
					{canGoBack ? ` | t=back (${previousPage})` : ""}
				</Text>
			</Box>
			<Box flexDirection="column" padding={1}>
				{currentPage === "home" && <Home />}
				{/*{currentPage === "settings" && <Settings />}*/}
				{currentPage === "help" && <Help />}
			</Box>
		</Box>
	);
};

export default App;
