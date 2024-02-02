"use client"

import { addProducts } from '@/libs/supabase/addProducts'
import { useRef } from "react"

export default function Page() {
	const formRef = useRef(null)

	const DummyData = {
		file_MP3: null,
		file_WAV: null,
		file_STEM: null,
		image: null,
		title: "The Coolest Beat Known to Man",
		type: "Beat",
		releaseDate: new Date(),
		description: "This is the description",
		tags: ["cool", "nice", "swag"],
		genres: ["R&B", "Hip Hop", "Rap"],
		moods: ["angry", "moody", "complicated"],
		keys: "BM",
		bpm: 175,
		instruments: ["Drums", "Guitar"],
		price: {
			basic: {
				checked: true,
				price: 30,
			},
			premium: {
				checked: true,
				price: 50,
			},
			exclusive: {
				checked: true,
				price: 250,
			},
		},
	}

	function createFormData(data) {
		const formData = new FormData()

		for (const key in data) {
			if (data[key] instanceof File) {
				formData.append(key, data[key], data[key].name)
			} else if (data[key] instanceof Object) {
				for (const subKey in data[key]) {
					formData.append(`${key}.${subKey}`, data[key][subKey])
				}
			} else {
				formData.append(key, data[key])
			}
		}

		return formData
	}

	const prettyForm = createFormData(DummyData)

	async function handleSubmit(e) {
		e.preventDefault()
		// const formData = new FormData(formRef.current)
		const formData = new FormData(DummyData)

		for (const item of formData) {
			console.log(item[0], item[1])
		}

		// await addProducts(formData)
	}

	return (
		<form ref={formRef} onSubmit={handleSubmit}>
			<label htmlFor="">form field</label>
			<input className="text-black" id="name" type="text" name="name" />
			<input type="file" id="file" name="file" /> {['test1', 'test2', 'test3']}
			<button>Submit Form</button>
		</form>
	)
}
