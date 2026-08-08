import { useInput } from "ink";

export function BooleanToggle({
	isChecked,
	switchBoolean,
}: {
	isChecked: boolean;
	switchBoolean: () => void;
}) {
	useInput((_, key) => {
		if (key.return) {
			switchBoolean();
		}
	});

	return <>{isChecked}</>;
}
