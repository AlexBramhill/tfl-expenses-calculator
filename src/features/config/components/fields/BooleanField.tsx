import { Box, Text, useFocus } from "ink";
import { BooleanToggle } from "@/components/BooleanToggle";
import { useThemeColour } from "@/components/ThemeColour";

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
	const themeColour = useThemeColour();

	return (
		<Box gap={1}>
			<Text color={isFocused ? themeColour : undefined}>{label}:</Text>
			<BooleanToggle
				isChecked={value}
				isFocused={isFocused}
				switchBoolean={() => onChange(!value)}
			/>
		</Box>
	);
}
