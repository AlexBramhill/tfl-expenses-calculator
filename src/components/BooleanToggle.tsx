import { Text, useInput } from "ink";

export function BooleanToggle({
	isChecked,
	isFocused,
	switchBoolean,
}: {
	isChecked: boolean;
	isFocused: boolean;
	switchBoolean: () => void;
}) {
	useInput(
		(_, key) => {
			if (key.return) {
				switchBoolean();
			}
		},
		{ isActive: isFocused },
	);

	return <Text>{isChecked ? "[X]" : "[ ]"}</Text>;
}
