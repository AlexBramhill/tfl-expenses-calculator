import { Box, render, Text, useInput } from "ink";
import { useState } from "react";
import useRouter from "../hooks/useRouter";
import Home from "../screens/Home";
import Settings from "../screens/Settings";

const App = () => {
	const { currentPage, previousPage, canGoBack, goToPage, goBack } =
		useRouter();

	useInput((input, key) => {
		if (input === "q") process.exit();
		if (input === "w") goToPage("home");
		if (input === "e") goToPage("settings");
		if (input === "t" && canGoBack) goBack();
	});

	return (
		<Box flexDirection="column">
			<Text color="green">Mini CLI Router</Text>

			{currentPage === "home" && <Home />}
			{currentPage === "settings" && <Settings />}

			<Box marginTop={1}>
				<Text dimColor>
					q=quit | w=home | e=settings
					{canGoBack ? ` | t=back (${previousPage})` : ""}
				</Text>
			</Box>
		</Box>
	);
};

export default App;
