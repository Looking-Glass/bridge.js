import { defineConfig } from "vite"
import typescript from "@rollup/plugin-typescript"
import path from "path"
import { typescriptPaths } from "rollup-plugin-typescript-paths"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
	// build the bridge.js library
	if (mode === "library") {
		return {
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
					entry: path.resolve(process.cwd(), "src/library/index.ts"),
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
		}
	} else if (mode === "react") {
		return {
			build: {
				outDir: "app",
			},
			plugins: [react()],
			rollupOptions: {
				external: [],
				plugins: [
					typescriptPaths({
						preserveExtensions: true,
					}),
					typescript({
						sourceMap: false,
						declaration: true,
						outDir: "app",
					}),
				],
			},
		}
	} else {
		throw new Error("Invalid mode. Please ensure the package.json file is configured properly")
	}
})
