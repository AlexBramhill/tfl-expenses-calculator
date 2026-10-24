import { Alert, Spinner } from "@inkjs/ui";
import { Box, useWindowSize } from "ink";
import { useState } from "react";
import { DEFAULT_THEME_COLOUR } from "@/api/configRepo";
import AppTitle from "@/app/components/AppTitle";
import NavBar from "@/app/components/NavBar";
import useAppInput from "@/app/useAppInput";
import useRouter from "@/app/useRouter";
import { ThemeColourProvider } from "@/components/ThemeColour";
import { LogStream } from "@/features/logs/components/LogStream";
import { useConfig } from "@/hooks/useConfig";
import ConfigScreen from "@/screens/ConfigScreen";
import HelpScreen from "@/screens/HelpScreen";
import HomeScreen from "@/screens/HomeScreen";

const App = () => {
	const { currentPage, previousPage, canGoBack, goToPage, goBack } =
		useRouter();

	const [showLogs, setShowLogs] = useState<boolean>(false);
	const { rows } = useWindowSize();
	const { config, isLoading, error, saveConfig } = useConfig();
	useAppInput({
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
		<ThemeColourProvider colour={config?.themeColour ?? DEFAULT_THEME_COLOUR}>
			<Box flexDirection="column" height={rows}>
				<Box flexDirection="column" paddingX={1}>
					<AppTitle />
					<NavBar
						currentPage={currentPage}
						previousPage={previousPage}
						canGoBack={canGoBack}
					/>
				</Box>
				<Box flexDirection="column" flexGrow={1} paddingX={1}>
					{isLoading && <Spinner label="Loading config" />}
					{error && <Alert variant="error">Error: {error.message}</Alert>}
					{config && currentPage === "home" && (
						<HomeScreen config={config} saveConfig={saveConfig} />
					)}
					{currentPage === "help" && <HelpScreen />}
					{config && currentPage === "settings" && (
						<ConfigScreen config={config} saveConfig={saveConfig} />
					)}
				</Box>
			</Box>
		</ThemeColourProvider>
	);
};

export default App;
