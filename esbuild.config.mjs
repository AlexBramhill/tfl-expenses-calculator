import { build } from "esbuild";

await build({
	entryPoints: ["src/main.tsx"],
	bundle: true,
	platform: "node",
	format: "esm",
	outfile: "dist/tfl.js",
	banner: {
		js: [
			"#!/usr/bin/env node",
			'import { createRequire as __createRequire } from "module";',
			"var require = __createRequire(import.meta.url);",
		].join("\n"),
	},
	plugins: [
		{
			name: "stub-optional-deps",
			setup(build) {
				build.onResolve({ filter: /^react-devtools-core$/ }, () => ({
					path: "react-devtools-core",
					namespace: "stub",
				}));
				build.onLoad({ filter: /.*/, namespace: "stub" }, () => ({
					contents: "export default null",
				}));
			},
		},
	],
});
