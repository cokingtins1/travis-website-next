import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount)
}

export function createFormData(
	data,
	uniqueAppendKey = null,
	uniqueAppendValue = null
) {
	let formData = new FormData()
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const value = data[key]
			if (
				Array.isArray(value) &&
				value.every((item) => typeof item === "object")
			) {
				value.forEach((obj, index) => {
					if (obj.hasOwnProperty("name")) {
						const newKey = `${key}_${index + 1}_name`
						formData.append(newKey, obj.name)
					}
				})
			} else {
				formData.append(key, value)
			}
		}
	}

	if (uniqueAppendKey && uniqueAppendValue) {
		formData.append(uniqueAppendKey, uniqueAppendValue)
	}

	return formData
}

export function returnArray(keyVal, formData) {
	let tagsArray = []
	formData.forEach((value, key) => {
		if (key.startsWith(keyVal)) {
			tagsArray.push(value)
		}
	})
	return tagsArray
}

export function formatDurationDisplay(duration) {
	const min = Math.floor(duration / 60)
	const sec = Math.floor(duration - min * 60)

	const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":")

	return formatted
}

// function addError(error) {
// 	setError((prevErrors) => {
// 		if (!prevErrors.includes(error)) {
// 			return [...prevErrors, error]
// 		} else return [...prevErrors, error]
// 	})
// }

// const removeError = (errorToRemove) => {
// 	setError((prevErrors) => {
// 		if (!prevErrors || !prevErrors.includes(error)) return prevErrors
// 		return prevErrors.filter((error) => error !== errorToRemove)
// 	})
// }

// if (!data.MP3_file && !data.WAV_file && !data.STEM_file) {
// 	const error = "You must upload a file to publish this product"
// 	addError(error)
// } else {
// 	removeError(error)
// }

// if (!data.productImage) {
// 	const error =
// 		"You must upload a product image to publish this product"
// 	addError(error)
// } else {
// 	removeError(error)
// }
