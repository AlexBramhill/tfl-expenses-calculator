import { useEffect, useState } from "react";
import { logDebug } from "@/features/logs";
import { toError } from "@/utils/errors";
import { type Config, loadConfig, writeConfig } from "../api/configRepo";

type ConfigState =
	| { isLoading: false; config?: undefined; error: Error }
	| { isLoading: true; config?: undefined; error?: undefined }
	| { isLoading: false; config: Config; error?: undefined };

export function useConfig() {
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
				setConfigState({ isLoading: false, error: toError(err) });
			}
		})();
	}, []);

	const saveConfig = async (config: Config) => {
		try {
			await writeConfig(config);
			setConfigState({ isLoading: false, config });
		} catch (err) {
			setConfigState({ isLoading: false, error: toError(err) });
		}
	};

	return { saveConfig, ...configState };
}
