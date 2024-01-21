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
				"border-primary": "#a7a7a7",
				"icon-primary": "#b3b3b3"
			},
			backgroundColor: {
				"bg-elevated": "rgb(36,36,36)",
				"bg-hover" : "#2a2a2a",
				"bg-dropDown": "rgb(45,45,45)",
				"bg-button": "#2a2a2a",
				"bg-buttonHover": "#2a2a2a",

			},
		},
	},
	plugins: [],
}
