import { useEffect, useState } from "react";
import { type Config, loadConfig, writeConfig } from "../repos/configRepo";

const useConfig = () => {
	const [config, setConfig] = useState<Config | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const cfg = await loadConfig();
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
