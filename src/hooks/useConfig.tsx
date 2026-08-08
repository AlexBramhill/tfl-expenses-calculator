import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { logDebug } from "@/features/logs";
import { type Config, loadConfig, writeConfig } from "../api/configRepo";

type ConfigState =
	| { isLoading: false; config?: undefined; error: Error }
	| { isLoading: true; config?: undefined; error?: undefined }
	| { isLoading: false; config: Config; error?: undefined };

type ConfigContextValue = {
	saveConfig: (config: Config) => void;
} & ConfigState;

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
	const [configState, setConfigState] = useState<ConfigState>({
		isLoading: true,
	});

	useEffect(() => {
		(async () => {
			try {
				logDebug("Loading config...");
				const cfg = await loadConfig();
				logDebug(
					`Config loaded:\n${JSON.stringify(cfg, null, 2).replace(/\\\\/g, "\\")}`,
				);
				setConfigState({ isLoading: false, config: cfg });
			} catch (err) {
				setConfigState({
					isLoading: false,
					error: err instanceof Error ? err : new Error(String(err)),
				});
			}
		})();
	}, []);

	const saveConfig = (config: Config) => {
		writeConfig(config);
		setConfigState({ isLoading: false, config });
	};

	return (
		<ConfigContext.Provider value={{ saveConfig, ...configState }}>
			{" "}
			{children}{" "}
		</ConfigContext.Provider>
	);
}

export const useConfig = () => {
	const context = useContext(ConfigContext);
	if (!context) {
		throw new Error("useConfig must be used within the context provider");
	}
	return context;
};
