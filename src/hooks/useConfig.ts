import { useEffect, useState } from "react";
import { logDebug } from "../logPublisher";
import { type Config, loadConfig, writeConfig } from "../repos/configRepo";

const useConfig = () => {
	const [config, setConfig] = useState<Config | null>(null);
	const [loading, setLoading] = useState(true);
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
				setLoading(false);
			}
		})();
	}, []);

	const saveConfig = async (updates: Partial<Config>) => {
		if (!config) return;
		const updated = await writeConfig({ ...config, ...updates });
		setConfig(updated);
	};

	return { config, loading, error, saveConfig };
};

export default useConfig;
