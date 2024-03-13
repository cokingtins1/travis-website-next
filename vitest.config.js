import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	define: {
		"import.meta.vitest": "undefined",
	},
	plugins: [tsconfigPaths(), react()],
	test: {
		includeSource: ["src/**/*./{js,ts}"],
		environment: "jsdom",

	},
})
