import { TextInput } from "@inkjs/ui";
import { Box, Text, useFocus } from "ink";
import { BooleanToggle } from "@/components/BooleanToggle";
import { type Config, useConfig } from "@/features/config";
import { FocusBox } from "@/features/journeys/components/FocusBox";

type ConfigField<K extends keyof Config = keyof Config> = {
	[P in K]: {
		key: P;
		label: string;
	};
}[K];

const configFields: ConfigField[] = [
	{ key: "csvFolder", label: "CSV Folder" },
	{ key: "homeStations", label: "Home stations" },
	{ key: "officeStations", label: "Office stations" },
	{ key: "isIncludingWeekends", label: "Include weekends" },
];

type ConfigEditorRowProps = {
	[K in keyof Config]: {
		fieldKey: K;
		configField: ConfigField<K>;
		configValue: Config[K];
		onChange: (newValue: Config[K]) => void;
	};
}[keyof Config];

function ConfigEditorRow(props: ConfigEditorRowProps) {
	const { isFocused } = useFocus();

	const input = (() => {
		switch (props.fieldKey) {
			case "csvFolder":
				return (
					<TextInput
						isDisabled={!isFocused}
						defaultValue={props.configValue}
						onChange={props.onChange}
					/>
				);
			case "homeStations":
			case "officeStations":
				return (
					<TextInput
						isDisabled={!isFocused}
						defaultValue={props.configValue.join(", ")}
						onChange={(value) =>
							props.onChange(
								value
									.split(",")
									.map((s) => s.trim())
									.filter(Boolean),
							)
						}
					/>
				);
			case "isIncludingWeekends":
				return (
					<BooleanToggle
						isChecked={props.configValue}
						switchBoolean={() => props.onChange(!props.configValue)}
					/>
				);
		}
	})();

	return (
		<Box gap={1}>
			<Text color={isFocused ? "green" : undefined}>
				{props.configField.label}:
			</Text>
			{input}
		</Box>
	);
}

function ConfigEditor() {
	const { config, isLoading, error, saveConfig } = useConfig();

	if (isLoading) return <Text>Loading...</Text>;
	if (error) return <Text>Error loading config: {error.message}.</Text>;

	return (
		<FocusBox isFocused={true}>
			<Box flexDirection="column">
				{configFields.map((field) => {
					const rowProps = {
						fieldKey: field.key,
						configField: field,
						configValue: config[field.key],
						onChange: (value: Config[keyof Config]) =>
							saveConfig({ [field.key]: value }),
					} as ConfigEditorRowProps;

					return <ConfigEditorRow key={field.key} {...rowProps} />;
				})}
			</Box>
		</FocusBox>
	);
}

export default ConfigEditor;
