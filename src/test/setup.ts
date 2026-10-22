import { cleanup, render } from "ink-testing-library";
import { createElement, Fragment } from "react";
import { afterEach, beforeEach } from "vitest";

const TERMINAL_COLUMNS = 160;

const widenTestTerminal = () => {
	const { stdout, unmount } = render(createElement(Fragment));
	unmount();

	Object.defineProperty(Object.getPrototypeOf(stdout), "columns", {
		configurable: true,
		value: TERMINAL_COLUMNS,
	});
};

beforeEach(widenTestTerminal);
afterEach(cleanup);
