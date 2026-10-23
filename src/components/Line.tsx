import { Text, type TextProps } from "ink";

export const Line = (props: Omit<TextProps, "wrap">) => (
	<Text {...props} wrap="truncate-end" />
);
