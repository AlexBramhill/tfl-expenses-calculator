import type { Config } from "@/api/configRepo";
import { DimBox } from "@/components/DimBox";
import { BooleanField } from "@/features/config/components/fields/BooleanField";
import { StringField } from "@/features/config/components/fields/StringField";
import { StringListField } from "@/features/config/components/fields/StringListField";
import UseLocalConfig from "@/features/config/hooks/useLocalConfig";

function ConfigEditor({
	config,
	saveConfig: _,
}: {
	config: Config;
	saveConfig: (config: Config) => void;
}) {
	const { localConfig, updateLocalConfig } = UseLocalConfig(config);

	return (
		<DimBox>
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
				onChange={(value) => updateLocalConfig({ isIncludingWeekends: value })}
			/>
		</DimBox>
	);
}

export default ConfigEditor;
