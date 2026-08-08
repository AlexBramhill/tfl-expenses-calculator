import {useEffect, useMemo, useState} from "react";
import type { Config } from "@/api/configRepo";

const useLocalConfig = (remoteConfig: Config) => {
	const [localConfig, setLocalConfig] = useState<Config | undefined>(undefined);

	useEffect(() => {
		setLocalConfig({ ...remoteConfig });
	}, [remoteConfig]);

	const updateLocalConfig = (configUpdate: Partial<Config>) => {
		setLocalConfig((oldConfig) => {
			if (oldConfig === undefined) {
				return;
			}
			return {
				...oldConfig,
				...configUpdate,
			};
		});
	};
	return { localConfig, updateLocalConfig };
};

export default useLocalConfig;