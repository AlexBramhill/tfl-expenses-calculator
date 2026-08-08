import { useEffect, useState } from "react";
import type { Config } from "@/api/configRepo";

const useLocalConfig = (remoteConfig: Config) => {
	const [localConfig, setLocalConfig] = useState<Config>({ ...remoteConfig });

	useEffect(() => {
		setLocalConfig({ ...remoteConfig });
	}, [remoteConfig]);

	const updateLocalConfig = (configUpdate: Partial<Config>) => {
		setLocalConfig((oldConfig) => ({
			...oldConfig,
			...configUpdate,
		}));
	};
	return { localConfig, updateLocalConfig };
};

export default useLocalConfig;
