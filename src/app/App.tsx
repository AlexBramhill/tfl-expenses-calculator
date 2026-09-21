import { Alert, Spinner } from "@inkjs/ui";
import { Box, Text, useWindowSize } from "ink";
import { useState } from "react";
import { LogStream } from "@/features/logs/components/LogStream";
import { useConfig } from "@/hooks/useConfig";
import ConfigScreen from "../screens/ConfigScreen";
import HomeScreen from "../screens/HomeScreen";
import NavBar from "./components/NavBar";
import useAppInput from "./useAppInput";
import useRouter from "./useRouter";

const App = () => {
	const { currentPage, previousPage, canGoBack, goToPage, goBack } =
		useRouter();

	const [showLogs, setShowLogs] = useState<boolean>(false);
	const { rows } = useWindowSize();
	const { config, isLoading, error, saveConfig } = useConfig();
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
				<NavBar
					currentPage={currentPage}
					previousPage={previousPage}
					canGoBack={canGoBack}
				/>
			</Box>
			<Box flexDirection="column" flexGrow={1} padding={1}>
				{isLoading && <Spinner label="Loading config" />}
				{error && <Alert variant="error">Error: {error.message}</Alert>}
				{config && currentPage === "home" && <HomeScreen config={config} />}
				{config && currentPage === "settings" && (
					<ConfigScreen config={config} saveConfig={saveConfig} />
				)}
			</Box>
		</Box>
	);
};

export default App;
