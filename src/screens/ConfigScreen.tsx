import { Text } from "ink";
import type { Config } from "@/api/configRepo";
import ConfigEditor from "@/features/config/components/ConfigEditor";

function ConfigScreen({
	config,
	saveConfig,
}: {
	config: Config;
	saveConfig: (config: Config) => void;
}) {
	return (
		<>
			<Text bold underline>
				Config
			</Text>
			<ConfigEditor config={config} saveConfig={saveConfig} />
		</>
	);
}

export default ConfigScreen;
