import { Box, Text, useInput } from "ink";
import { LogStream } from "../components/LogStream";
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
		<Box flexDirection="column" padding={1} height={process.stdout.rows}>
			<Box flexGrow={1}>
				<Box flexDirection="column" flexGrow={1}>
					<Text color="green" underline={true}>
						Mini CLI Router
					</Text>
					{currentPage === "home" && <Home />}
					{currentPage === "settings" && <Settings />}
				</Box>
				<Box
					borderStyle="single"
					borderLeft={true}
					borderTop={false}
					borderBottom={false}
					borderRight={false}
					paddingLeft={1}
					marginLeft={1}
					flexShrink={0}
					width="33%"
				>
					<LogStream />
				</Box>
			</Box>
			<Box>
				<Text dimColor>
					q=quit | w=home | e=settings
					{canGoBack ? ` | t=back (${previousPage})` : ""}
				</Text>
			</Box>
		</Box>
	);
};

export default App;
