import { Box, Text, useInput } from "ink";
import useConfig from "../hooks/useConfig";
import useRouter from "../hooks/useRouter";
import Home from "../screens/Home";
import Settings from "../screens/Settings";

const App = () => {
	const { currentPage, previousPage, canGoBack, goToPage, goBack } =
		useRouter();
	const {
		config,
		loading: configLoading,
		saveConfig: _saveConfig,
		error: configError,
	} = useConfig();

	useInput((input, _key) => {
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

			<Box marginTop={1} justifyContent="space-between">
				<Text dimColor>
					q=quit | w=home | e=settings
					{canGoBack ? ` | t=back (${previousPage})` : ""}
				</Text>
				<Text dimColor>
					{configLoading
						? "Loading config..."
						: configError
							? `Config error: ${configError.message}`
							: `Config loaded:\n${JSON.stringify(config, null, 2).replace(/\\\\/g, '\\')}`}
				</Text>
			</Box>
		</Box>
	);
};

export default App;
