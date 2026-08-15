import { useInput } from "ink";
import { useCallback } from "react";
import type { Config } from "@/api/configRepo";
import { SpacedBox } from "@/components/SpacedBox";
import { BooleanField } from "@/features/config/components/fields/BooleanField";
import { StringField } from "@/features/config/components/fields/StringField";
import { StringListField } from "@/features/config/components/fields/StringListField";
import useLocalConfig from "@/features/config/hooks/useLocalConfig";

function ConfigEditor({
	config,
	saveConfig,
}: {
	config: Config;
	saveConfig: (config: Config) => void;
}) {
	const { localConfig, updateLocalConfig } = useLocalConfig(config);

	useInput((_input, key) => {
		if (key.escape) saveConfig(localConfig);
	});

	const onCsvFolderChange = useCallback(
		(value: string) => updateLocalConfig({ csvFolder: value }),
		[updateLocalConfig],
	);
	const onHomeStationsChange = useCallback(
		(value: string[]) => updateLocalConfig({ homeStations: value }),
		[updateLocalConfig],
	);
	const onOfficeStationsChange = useCallback(
		(value: string[]) => updateLocalConfig({ officeStations: value }),
		[updateLocalConfig],
	);
	const onIncludeWeekendsChange = useCallback(
		(value: boolean) => updateLocalConfig({ isIncludingWeekends: value }),
		[updateLocalConfig],
	);

	return (
		<SpacedBox>
			<StringField
				label="CSV Folder"
				value={localConfig.csvFolder}
				onChange={onCsvFolderChange}
			/>
			<StringListField
				label="Home stations"
				value={localConfig.homeStations}
				onChange={onHomeStationsChange}
			/>
			<StringListField
				label="Office stations"
				value={localConfig.officeStations}
				onChange={onOfficeStationsChange}
			/>
			<BooleanField
				label="Include weekends"
				value={localConfig.isIncludingWeekends}
				onChange={onIncludeWeekendsChange}
			/>
		</SpacedBox>
	);
}

export default ConfigEditor;
