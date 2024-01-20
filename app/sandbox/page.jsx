"use client"

import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"
import Image from "next/image"
import getPosts from "@/libs/getPosts"
import SearchComponent from "../components/SearchBar/SearchComponent"
import AddContentForm from "../components/Dashboard Components/AddContentForm/AddContentForm"

import dayjs from "dayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { useState } from "react"
import InputTag from "../components/Dashboard Components/AddContentForm/Upload Components/InputTag"
import SearchTag from "../components/Dashboard Components/AddContentForm/Upload Components/TagInput"
import TagInput from "../components/Dashboard Components/AddContentForm/Upload Components/TagInput"

import DropDownSelect from "@/app/components/Dashboard Components/AddContentForm/Upload Components/DropdownSelect"
import { Button } from "../components/UI/Button"
import InputType from "../components/Dashboard Components/AddContentForm/Upload Components/InputType"
import PricingSwitch from "../components/Dashboard Components/AddContentForm/Upload Components/Switch"

export default function Page() {
	// const [value, setValue] = useState(dayjs().format("DD/MM/YYYY"))
	// const [value, setValue] = useState(dayjs())
	// console.log("Value:", value, "Type:", typeof(value), typeof(dayjs().format("DD/MM/YYYY")))
	// console.log(value)

	return (
		<>
			<div className=" flex justify-center">
				{/* <InputTag /> */}
				{/* <TagInput dropDownList={DropDown.Genre} addFunctionality limit={2} /> */}
				<Button>Click Me</Button>
			</div>

			<div>
				<h1 className='text-center xl:text-rose-500 '>Test Tailwind Config Div</h1>
			</div>
		</>
	)
}

{
	/* <LocalizationProvider dateAdapter={AdapterDayjs}>
{/* <DatePicker
	// defaultValue={dayjs('2022-04-17')}
	value={dayjs(value).format("DD/MM/YYYY")}
	onChange={(newValue) =>
		setValue(dayjs(newValue).format("DD/MM/YYYY"))
	}
/> */
}

{
	/* <DatePicker
	value={value}
	onChange={(newValue) => setValue(newValue)}
/> */
}
// </LocalizationProvider> */}
