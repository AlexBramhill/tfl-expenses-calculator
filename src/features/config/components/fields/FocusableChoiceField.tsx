import { useFocus } from "ink";
import type { ComponentProps } from "react";
import { ChoiceField } from "@/components/ChoiceField";

export function FocusableChoiceField<T extends string>(
	props: Omit<ComponentProps<typeof ChoiceField<T>>, "isFocused">,
) {
	const { isFocused } = useFocus();
	return <ChoiceField {...props} isFocused={isFocused} />;
}
