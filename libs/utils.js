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
