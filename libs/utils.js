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

	const secondsInMinute = 60
	const secondsInHour = 60 * secondsInMinute
	const secondsInDay = 24 * secondsInHour
	const secondsInWeek = 7 * secondsInDay
	const secondsInYear = 365 * secondsInDay

	if (secondsSince < secondsInMinute) {
		return `${secondsSince} ${
			secondsSince === 1 ? "second" : "seconds"
		} ago`
	} else if (secondsSince < secondsInHour) {
		const minutesSince = Math.round(secondsSince / secondsInMinute)
		return `${minutesSince} ${
			minutesSince === 1 ? "minute" : "minutes"
		} ago`
	} else if (secondsSince < secondsInDay) {
		const hours = Math.round(secondsSince / secondsInHour)
		return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
	} else if (secondsSince < secondsInWeek) {
		const days = Math.round(secondsSince / secondsInDay)
		return `${days} ${days === 1 ? "day" : "days"} ago`
	} else if (secondsSince < secondsInYear) {
		const weeks = Math.round(secondsSince / secondsInWeek)
		return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
	} else {
		const years = Math.round(secondsSince / secondsInYear)
		return `${years} ${years === 1 ? "year" : "years"} ago`
	}
}
