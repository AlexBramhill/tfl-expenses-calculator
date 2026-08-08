import { Box } from "ink";
import type { Config } from "@/api/configRepo";
import { BooleanField } from "@/features/config/components/fields/BooleanField";
import { StringField } from "@/features/config/components/fields/StringField";
import { StringListField } from "@/features/config/components/fields/StringListField";
import UseLocalConfig from "@/features/config/hooks/useLocalConfig";
import { FocusBox } from "@/features/journeys/components/FocusBox";

function ConfigEditor({
	config,
	saveConfig: _,
}: {
	config: Config;
	saveConfig: (config: Config) => void;
}) {
	const { localConfig, updateLocalConfig } = UseLocalConfig(config);

	return (
		<FocusBox isFocused={true}>
			<Box flexDirection="column">
				<StringField
					label="CSV Folder"
					value={localConfig.csvFolder}
					onChange={(value) => updateLocalConfig({ csvFolder: value })}
				/>
				<StringListField
					label="Home stations"
					value={localConfig.homeStations}
					onChange={(value) => updateLocalConfig({ homeStations: value })}
				/>
				<StringListField
					label="Office stations"
					value={localConfig.officeStations}
					onChange={(value) => updateLocalConfig({ officeStations: value })}
				/>
				<BooleanField
					label="Include weekends"
					value={localConfig.isIncludingWeekends}
					onChange={(value) =>
						updateLocalConfig({ isIncludingWeekends: value })
					}
				/>
			</Box>
		</FocusBox>
	);
}

export default ConfigEditor;
