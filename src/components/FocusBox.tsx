import { Box, useFocus } from "ink";
import type { ComponentType, ReactNode } from "react";

export function FocusBox({
	children,
	isFocused,
}: {
	children: ReactNode;
	isFocused: boolean;
}) {
	return (
		<Box
			flexDirection="column"
			borderStyle="round"
			borderDimColor={isFocused ? undefined : true}
			borderColor={isFocused ? "green" : undefined}
			padding={1}
		>
			{children}
		</Box>
	);
}

export type FocusProps = {
	isFocused: boolean;
};

function withFocusBoxWrapper<P>(
	Component: ComponentType<P & FocusProps>,
	autoFocus?: boolean,
) {
	return function Wrapped(props: P) {
		const { isFocused } = useFocus({ autoFocus });
		return (
			<FocusBox isFocused={isFocused}>
				<Component {...props} isFocused={isFocused} />
			</FocusBox>
		);
	};
}

export default withFocusBoxWrapper;
