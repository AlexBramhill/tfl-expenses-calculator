import { useFocus } from "ink";
import type { ComponentType } from "react";
import { FocusBox, type FocusProps } from "./FocusBox";

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
