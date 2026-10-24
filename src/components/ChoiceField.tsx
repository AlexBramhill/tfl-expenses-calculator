import { Box, Text, useInput } from "ink";
import { useThemeColour } from "@/components/ThemeColour";
import { getNextOption } from "@/utils/options";

export function ChoiceField<T extends string>({
	label,
	value,
	options,
	isFocused,
	onChange,
}: {
	label: string;
	value: T;
	options: readonly T[];
	isFocused: boolean;
	onChange: (value: T) => void;
}) {
	const themeColour = useThemeColour();

	useInput(
		(_input, key) => {
			if (key.rightArrow) onChange(getNextOption(options, value, 1));
			if (key.leftArrow) onChange(getNextOption(options, value, -1));
		},
		{ isActive: isFocused },
	);

	return (
		<Box gap={1}>
			<Text color={isFocused ? themeColour : undefined}>{label}:</Text>
			<Text>‹ {value} ›</Text>
		</Box>
	);
}
