import { useEffect, useState } from "react";
import { logDebug } from "../logPublisher";
import { type Config, loadConfig, writeConfig } from "../repos/configRepo";

type SaveConfigCallback = (config: Config) => void;

type ConfigResult = {
	saveConfig: SaveConfigCallback;
} & (
	| { isLoading: true; config: null; error: null }
	| { isLoading: false; config: Config; error: Error | null }
);

const useConfig = (): ConfigResult => {
	const [config, setConfig] = useState<Config | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		(async () => {
			try {
				logDebug("Loading config...");
				const cfg = await loadConfig();
				logDebug(
					`Config loaded:\n${JSON.stringify(cfg, null, 2).replace(/\\\\/g, "\\")}`,
				);
				setConfig(cfg);
			} catch (err) {
				setError(err instanceof Error ? err : new Error(String(err)));
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const saveConfig: SaveConfigCallback = async (updates: Partial<Config>) => {
		if (!config) return;
		const updated = await writeConfig({ ...config, ...updates });
		setConfig(updated);
	};

	return { config, isLoading, error, saveConfig } as ConfigResult;
};

export default useConfig;
