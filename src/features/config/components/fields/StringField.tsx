import { TextInput } from "@inkjs/ui";
import { Box, Text, useFocus } from "ink";

export function StringField({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
}) {
	const { isFocused } = useFocus();

	return (
		<Box gap={1}>
			<Text color={isFocused ? "green" : undefined}>{label}:</Text>
			<TextInput
				isDisabled={!isFocused}
				defaultValue={value}
				onChange={onChange}
			/>
		</Box>
	);
}
