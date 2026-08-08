import { TextInput } from "@inkjs/ui";
import { useFocus } from "ink";
import type { Config } from "@/api/configRepo";
import UseLocalConfig from "@/features/config/hooks/useLocalConfig";
import { FocusBox } from "@/features/journeys/components/FocusBox";

function ConfigEditor({
	config,
	saveConfig: _,
}: {
	config: Config;
	saveConfig: (config: Config) => void;
}) {
	const { isFocused } = useFocus();
	const { localConfig, updateLocalConfig } = UseLocalConfig(config);

	return (
		<FocusBox isFocused={isFocused}>
			<TextInput
				isDisabled={!isFocused}
				defaultValue={localConfig.csvFolder}
				onChange={(value) => {
					updateLocalConfig({ csvFolder: value });
				}}
			/>
		</FocusBox>
	);
}

export default ConfigEditor;
