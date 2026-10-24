import { TextInput } from "@inkjs/ui";
import { Box, Text, useFocus } from "ink";
import { useCallback } from "react";
import { useThemeColour } from "@/components/ThemeColour";

export function StringListField({
	label,
	value,
	onChange,
	focusId,
}: {
	label: string;
	value: string[];
	onChange: (value: string[]) => void;
	focusId: string;
}) {
	const { isFocused } = useFocus({ id: focusId });
	const themeColour = useThemeColour();

	const handleChange = useCallback(
		(newValue: string) =>
			onChange(
				newValue
					.split(",")
					.map((s) => s.trim())
					.filter(Boolean),
			),
		[onChange],
	);

	return (
		<Box gap={1}>
			<Text color={isFocused ? themeColour : undefined}>{label}:</Text>
			<TextInput
				isDisabled={!isFocused}
				defaultValue={value.join(", ")}
				onChange={handleChange}
			/>
		</Box>
	);
}
