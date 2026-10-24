import { TextInput } from "@inkjs/ui";
import { Box, Text, useFocus } from "ink";
import { useThemeColour } from "@/components/ThemeColour";

export function StringField({
	label,
	value,
	onChange,
	focusId,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
	focusId: string;
}) {
	const { isFocused } = useFocus({ id: focusId });
	const themeColour = useThemeColour();

	return (
		<Box gap={1}>
			<Text color={isFocused ? themeColour : undefined}>{label}:</Text>
			<TextInput
				isDisabled={!isFocused}
				defaultValue={value}
				onChange={onChange}
			/>
		</Box>
	);
}
