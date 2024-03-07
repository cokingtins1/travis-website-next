/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"text-primary": "#fff",
				"text-secondary": "#a7a7a7",
				"text-tag": "#131A20",
				"text-error": "#F44336",
				"blue-accent": "#1976D2",
				"bg-base": "#000000",
				"border-primary": "#a9a9a980",
				"border-btn-select": "#005FF8",
				"icon-primary": "#b3b3b3",
			},
			backgroundColor: {
				"bg-free": "#3ECF8E",
				"bg-accent-blue": "#007FFF",
				"bg-accent-khaki": "#ffeec2",
				"bg-disabled": "#929292",
				"bg-accent-red": "#FF033E",
				"bg-elevated": "#121212",
				"bg-secondary": "#242424",
				"bg-secondary-light": "#a7a7a7",
				"bg-hover": "#2a2a2a",
				"bg-dropDown": "#2D2D2D ",
				"bg-button": "#2a2a2a",
				"bg-btn-select": "#081B39",
				"bg-buttonHover": "#2a2a2a",
				"bg-tag": "#90CAF9",
			},
		},
	},
	plugins: [],
}
