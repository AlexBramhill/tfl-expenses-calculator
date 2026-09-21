import { TextInput } from "@inkjs/ui";
import { Box, Text, useFocus } from "ink";
import { useCallback } from "react";

export function StringListField({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string[];
	onChange: (value: string[]) => void;
}) {
	const { isFocused } = useFocus();

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
			<Text color={isFocused ? "green" : undefined}>{label}:</Text>
			<TextInput
				isDisabled={!isFocused}
				defaultValue={value.join(", ")}
				onChange={handleChange}
			/>
		</Box>
	);
}
