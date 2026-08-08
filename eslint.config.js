import reactCompiler from "eslint-plugin-react-compiler";
import tseslint from "typescript-eslint";

export default [
	{
		ignores: ["dist/**"],
	},
	{
		files: ["src/**/*.{ts,tsx}"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			"react-compiler": reactCompiler,
		},
		rules: {
			"react-compiler/react-compiler": "error",
		},
	},
];
