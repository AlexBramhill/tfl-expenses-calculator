import { Box, Text, useInput } from "ink";
import { useState } from "react";
import { LogStream } from "../components/LogStream";
import useRouter from "../hooks/useRouter";
import Home from "../screens/Home";
import Settings from "../screens/Settings";

const App = () => {
	const { currentPage, previousPage, canGoBack, goToPage, goBack } =
		useRouter();

	const [showLogs, setShowLogs] = useState<boolean>(false);
	useInput((input, _key) => {
		if (input === "q") process.exit();
		if (input === "w") goToPage("home");
		if (input === "e") goToPage("settings");
		if (input === "t" && canGoBack) goBack();
		if (input === "d") setShowLogs((prev) => !prev);
	});

	if (showLogs) {
		return (
			<Box>
				<LogStream />
			</Box>
		);
	}

	return (
		<Box flexDirection="column">
			<Box flexDirection="column" padding={1}>
				<Text color="green" underline={true}>
					TFL CSV Expense Parser
				</Text>
				<Text dimColor>
					q=quit | w=home | e=settings
					{canGoBack ? ` | t=back (${previousPage})` : ""}
				</Text>
			</Box>
			<Box flexDirection="column" padding={1}>
				{currentPage === "home" && <Home />}
				{currentPage === "settings" && <Settings />}
			</Box>
		</Box>
	);
};

export default App;
