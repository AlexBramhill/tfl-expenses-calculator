import { Box, Text, useFocus } from "ink";
import { BooleanToggle } from "@/components/BooleanToggle";

export function BooleanField({
	label,
	value,
	onChange,
}: {
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
}) {
	const { isFocused } = useFocus();

	return (
		<Box gap={1}>
			<Text color={isFocused ? "green" : undefined}>{label}:</Text>
			<BooleanToggle
				isChecked={value}
				isFocused={isFocused}
				switchBoolean={() => onChange(!value)}
			/>
		</Box>
	);
}
