import React from "react"
import MUISwitch from "@mui/material/Switch"
import useTheme from "@/libs/contexts/ThemeContext"

export default function ThemeButton() {
	// const { themeMode, lightTheme, darkTheme } = useTheme()
	// function onChangeBtn(e) {
	// 	const darkModeStatus = e.currentTarget.checked
	//     console.log('theme clicked')
	// 	if (darkModeStatus) {
	// 		lightTheme()
	// 	} else {
	// 		darkTheme()
	// 	}
	// }

	return <MUISwitch />
}
