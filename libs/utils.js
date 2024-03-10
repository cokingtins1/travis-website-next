import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"

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

export function returnFileType(type) {
	let fileType
	switch (type) {
		case "BASIC":
			fileType = "MP3"
			break
		case "PREMIUM":
			fileType = "WAV"
			break
		case "STEM" || "ZIP":
			fileType = "STEMs"
			break
	}

	return fileType
}

export function returnCommentAge(timeStamp) {
	const secondsSince = dayjs().diff(dayjs(timeStamp), "second")

	//need to set allowance for server/client rendering times
	const timeIncrement = 15

	const roundedSecondsSince =
		Math.round(secondsSince / timeIncrement) * timeIncrement

	if (roundedSecondsSince < timeIncrement) {
		return `${roundedSecondsSince} ${
			roundedSecondsSince === 1 ? "second" : "seconds"
		} ago`
	} else if (roundedSecondsSince < 60) {
		return `${roundedSecondsSince} seconds ago`
	} else if (roundedSecondsSince < 60 * 15) {
		const minutesSince = Math.round(roundedSecondsSince / 60)
		return `${minutesSince} ${
			minutesSince === 1 ? "minute" : "minutes"
		} ago`
	} else if (roundedSecondsSince < 60 * 60) {
		const minutesSince = Math.round(roundedSecondsSince / 60)
		return `${minutesSince} minutes ago`
	} else if (roundedSecondsSince < 60 * 60 * 24) {
		const hours = Math.round(roundedSecondsSince / (60 * 60))
		return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
	} else if (roundedSecondsSince < 60 * 60 * 24 * 7) {
		const days = Math.round(roundedSecondsSince / (60 * 60 * 24))
		return `${days} ${days === 1 ? "day" : "days"} ago`
	} else if (roundedSecondsSince < 60 * 60 * 24 * 365) {
		const weeks = Math.round(roundedSecondsSince / (60 * 60 * 24 * 7))
		return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
	} else {
		const years = Math.round(roundedSecondsSince / (60 * 60 * 24 * 365))
		return `${years} ${years === 1 ? "year" : "years"} ago`
	}
}

export function secondsSince(timeStamp) {
	const result = dayjs().diff(dayjs(timeStamp), "second")
	return result
}
