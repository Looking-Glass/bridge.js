import { defineConfig } from "vite"
import typescript from "@rollup/plugin-typescript"
import path from "path"
import { typescriptPaths } from "rollup-plugin-typescript-paths"

export default defineConfig({
	plugins: [],
	resolve: {
		alias: [
			{
				find: "~",
				replacement: path.resolve(__dirname, "./src"),
			},
		],
	},
	server: {
		port: 5179,
	},
	build: {
		manifest: true,
		minify: true,
		reportCompressedSize: true,
		lib: {
			entry: path.resolve(process.cwd(), "src/index.ts"),
			name: "@lookingglass/bridge.js",
			fileName: "looking-glass-bridge",
			formats: ["es", "cjs"],
		},
		rollupOptions: {
			external: [],
			plugins: [
				typescriptPaths({
					preserveExtensions: true,
				}),
				typescript({
					sourceMap: false,
					declaration: true,
					outDir: "dist",
				}),
			],
		},
	},
})
