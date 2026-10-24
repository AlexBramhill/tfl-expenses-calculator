import { useFocusManager, useInput } from "ink";
import { useCallback, useEffect, useEffectEvent } from "react";
import { type Config, THEME_COLOURS, type ThemeColour } from "@/api/configRepo";
import { SpacedBox } from "@/components/SpacedBox";
import { usePreviewThemeColour } from "@/components/ThemeColour";
import { BooleanField } from "@/features/config/components/fields/BooleanField";
import { FocusableChoiceField } from "@/features/config/components/fields/FocusableChoiceField";
import { StringField } from "@/features/config/components/fields/StringField";
import { StringListField } from "@/features/config/components/fields/StringListField";
import useLocalConfig from "@/features/config/hooks/useLocalConfig";
import { TEXT_FIELD_IDS } from "@/features/config/textFieldIds";

function ConfigEditor({
	config,
	saveConfig,
}: {
	config: Config;
	saveConfig: (config: Config) => void;
}) {
	const { localConfig, updateLocalConfig } = useLocalConfig(config);
	usePreviewThemeColour(localConfig.themeColour);
	useSaveOnLeave(localConfig, saveConfig);
	useArrowKeysToMoveBetweenFields();

	const onThemeColourChange = useCallback(
		(value: ThemeColour) => updateLocalConfig({ themeColour: value }),
		[updateLocalConfig],
	);
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
			<FocusableChoiceField
				label="Theme colour"
				value={localConfig.themeColour}
				options={THEME_COLOURS}
				onChange={onThemeColourChange}
			/>
			<StringField
				label="CSV Folder"
				value={localConfig.csvFolder}
				onChange={onCsvFolderChange}
				focusId={TEXT_FIELD_IDS.csvFolder}
			/>
			<StringListField
				label="Home stations"
				value={localConfig.homeStations}
				onChange={onHomeStationsChange}
				focusId={TEXT_FIELD_IDS.homeStations}
			/>
			<StringListField
				label="Office stations"
				value={localConfig.officeStations}
				onChange={onOfficeStationsChange}
				focusId={TEXT_FIELD_IDS.officeStations}
			/>
			<BooleanField
				label="Include weekends"
				value={localConfig.isIncludingWeekends}
				onChange={onIncludeWeekendsChange}
			/>
		</SpacedBox>
	);
}

const useSaveOnLeave = (
	localConfig: Config,
	saveConfig: (config: Config) => void,
) => {
	const saveLatestConfig = useEffectEvent(() => saveConfig(localConfig));

	useEffect(() => () => saveLatestConfig(), []);
};

const useArrowKeysToMoveBetweenFields = () => {
	const { focusNext, focusPrevious } = useFocusManager();

	useInput((_input, key) => {
		if (key.downArrow) focusNext();
		if (key.upArrow) focusPrevious();
	});
};

export default ConfigEditor;
