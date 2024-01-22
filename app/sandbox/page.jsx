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

import SearchTag from "../components/Dashboard Components/AddContentForm/Upload Components/TagInput"
import TagInput from "../components/Dashboard Components/AddContentForm/Upload Components/TagInput"

import DropDownSelect from "@/app/components/Dashboard Components/AddContentForm/Upload Components/DropdownSelect"
import { Button } from "../components/UI/Button"
import InputType from "../components/Dashboard Components/AddContentForm/Upload Components/InputType"
import PricingSwitch from "../components/Dashboard Components/AddContentForm/Upload Components/PricingSwitch"

export default function Page() {
	// const [value, setValue] = useState(dayjs().format("DD/MM/YYYY"))
	// const [value, setValue] = useState(dayjs())
	// console.log("Value:", value, "Type:", typeof(value), typeof(dayjs().format("DD/MM/YYYY")))
	// console.log(value)

	return (
		<>
			<div className="flex flex-col items-center justify-center gap-4 mt-12">
				{/* <InputTag /> */}
				{/* <TagInput dropDownList={DropDown.Genre} addFunctionality limit={2} /> */}
				<div className="grid grid-cols-2 auto-rows-auto items-center gap-y-2">
					<span>default</span>
					<Button
						onClick={() => {
							console.log("clicked")
						}}
						variant="default"
					>
						Click Me
					</Button>
					<span>destrictive</span>
					<Button variant="destructive">Click Me</Button>
					<span>outline</span>
					<Button variant="outline">Click Me</Button>
					<span>subtle</span>
					<Button variant="subtle">Click Me</Button>
					<span>ghost</span>
					<Button variant="ghost">Click Me</Button>
					<span>link</span>
					<Button variant="link">Click Me</Button>
				</div>
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
