import { cleanup, render } from "ink-testing-library";
import { createElement, Fragment } from "react";
import { afterEach, beforeEach } from "vitest";
import { TERMINAL_COLUMNS, TERMINAL_ROWS } from "@/test/terminalSize";

const fixTestTerminalSize = () => {
	const { stdout, unmount } = render(createElement(Fragment));
	unmount();

	const testTerminal = Object.getPrototypeOf(stdout);
	setFixedProperty(testTerminal, "columns", TERMINAL_COLUMNS);
	setFixedProperty(testTerminal, "rows", TERMINAL_ROWS);
};

const setFixedProperty = (target: object, name: string, value: number) =>
	Object.defineProperty(target, name, { configurable: true, value });

beforeEach(fixTestTerminalSize);
afterEach(cleanup);
