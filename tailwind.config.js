const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/react-app/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Poppins", ...defaultTheme.fontFamily.sans],
				// serif: ["Bitter", ...defaultTheme.fontFamily.serif],
				rubik: ["Rubik", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				bluey: {
					100: "#EFF6FA",
					200: "#D8E7ED",
				},
				"dark-purple": {
					100: "#1F1E37",
					200: "#28273F",
				},
				"light-purple": "#A055FA",
			},
		},
	},
	plugins: [
		require("@tailwindcss/aspect-ratio"),
		require("tailwindcss-text-fill-stroke"),
		require("tailwindcss-text-fill"),
	],
}
