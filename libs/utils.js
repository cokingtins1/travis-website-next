import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
}

export function createFormData(
	data,
	uniqueAppendKey = null,
	uniqueAppendValue = null
) {
	let formData = new FormData();
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const value = data[key];
			if (
				Array.isArray(value) &&
				value.every((item) => typeof item === "object")
			) {
				value.forEach((obj, index) => {
					if (obj.hasOwnProperty("name")) {
						const newKey = `${key}_${index + 1}_name`;
						formData.append(newKey, obj.name);
					}
				});
			} else {
				formData.append(key, value);
			}
		}
	}

	if (uniqueAppendKey && uniqueAppendValue) {
		formData.append(uniqueAppendKey, uniqueAppendValue);
	}

	return formData;
}

export function returnArray(keyVal, formData) {
	let tagsArray = [];
	formData.forEach((value, key) => {
		if (key.startsWith(keyVal)) {
			tagsArray.push(value.trim());
		}
	});

	let newArray = tagsArray.map((tag) => {
		const wordCount = tag.split(" ").length;
		if (wordCount > 0) {
			const wordsArray = tag.split(" ");
			for (let i = 0; i < wordsArray.length; i++) {
				wordsArray[i] =
					wordsArray[i].toLowerCase().charAt(0).toUpperCase() +
					wordsArray[i].toLowerCase().substring(1);
			}
			tag = wordsArray.join(" ");
		}
		return tag;
	});

	return newArray;
}

export function formatDurationDisplay(duration) {
	const min = Math.floor(duration / 60);
	const sec = Math.floor(duration - min * 60);

	const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":");

	return formatted;
}

export function returnFileType(type) {
	let fileType;
	switch (type) {
		case "BASIC":
			fileType = "MP3";
			break;
		case "PREMIUM":
			fileType = "WAV";
			break;
		case "STEM" || "ZIP":
			fileType = "STEMs";
			break;
	}

	return fileType;
}

export function returnCommentAge(timeStamp) {
	const secondsSince = dayjs().diff(dayjs(timeStamp), "second");

	//need to set allowance for server/client rendering times
	const timeIncrement = 15;

	const roundedSecondsSince =
		Math.round(secondsSince / timeIncrement) * timeIncrement;

	if (roundedSecondsSince < timeIncrement) {
		return `${roundedSecondsSince} ${
			roundedSecondsSince === 1 ? "second" : "seconds"
		} ago`;
	} else if (roundedSecondsSince < 60) {
		return `${roundedSecondsSince} seconds ago`;
	} else if (roundedSecondsSince < 60 * 15) {
		const minutesSince = Math.round(roundedSecondsSince / 60);
		return `${minutesSince} ${
			minutesSince === 1 ? "minute" : "minutes"
		} ago`;
	} else if (roundedSecondsSince < 60 * 60) {
		const minutesSince = Math.round(roundedSecondsSince / 60);
		return `${minutesSince} minutes ago`;
	} else if (roundedSecondsSince < 60 * 60 * 24) {
		const hours = Math.round(roundedSecondsSince / (60 * 60));
		return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
	} else if (roundedSecondsSince < 60 * 60 * 24 * 7) {
		const days = Math.round(roundedSecondsSince / (60 * 60 * 24));
		return `${days} ${days === 1 ? "day" : "days"} ago`;
	} else if (roundedSecondsSince < 60 * 60 * 24 * 365) {
		const weeks = Math.round(roundedSecondsSince / (60 * 60 * 24 * 7));
		return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
	} else {
		const years = Math.round(roundedSecondsSince / (60 * 60 * 24 * 365));
		return `${years} ${years === 1 ? "year" : "years"} ago`;
	}
}

export function secondsSince(timeStamp) {
	const result = dayjs().diff(dayjs(timeStamp), "second");
	return result;
}

export function getBPMData(data) {
	const sortedBPM = data
		.map((product) => product.product_data.bpm)
		.sort((a, b) => a - b);
	const minBmp = Math.min(...sortedBPM);
	const maxBmp = Math.max(...sortedBPM);
	const bpmRange = [minBmp, maxBmp];

	return bpmRange;
}

export function getFilterProducts(data, searchParams) {
	const searchParamsObject = {};
	searchParams.forEach((value, key) => {
		if (searchParamsObject[key]) {
			searchParamsObject[key] += `,${value}`;
		} else {
			searchParamsObject[key] = value;
		}
	});

	const filteredProducts = data.filter((product) =>
		Object.entries(searchParamsObject).every(([key, value]) => {
			if (key === "bpm") {
				const [minBpm, maxBpm] = value.split(",").map(Number);
				return (
					product.product_data[key] >= minBpm &&
					product.product_data[key] <= maxBpm
				);
			} else if (key === "tags") {
				const tags = value.split(",").map((tag) => tag.trim());
				return tags.every((tag) =>
					product.product_data[key].includes(tag)
				);
			} else {
				return (
					product.product_data[key] &&
					product.product_data[key].includes(value)
				);
			}
		})
	);
	return filteredProducts;
}

export function productFilter(data, allFilters) {
	//works with searchParams, not useSearchParams
	if (Object.keys(allFilters).length === 0) return data;

	const filteredProducts = data.filter((product) =>
		Object.entries(allFilters).every(([key, value]) => {
			if (key === "bpm") {
				const [minBpm, maxBpm] = value.split(",").map(Number);
				return (
					product.product_data[key] >= minBpm &&
					product.product_data[key] <= maxBpm
				);
			} else {
				const values = value.split(",").map((tag) => tag.trim());
				return values.every((tag) =>
					product.product_data[key].includes(tag)
				);
			}
		})
	);
	return filteredProducts;
}

export function returnFilters(array, filter) {
	const allValues = array?.flatMap((product) => product.product_data[filter]);
	const uniqueValues = Array.from(new Set(allValues))?.sort();

	allValues?.sort();

	return [uniqueValues, allValues];
}

export function shuffleArray(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array.slice(0, 10);
}

export function getAudioFile(fileArray) {
	const storeSrc = fileArray.find(
		(file) =>
			(file.file_extension === ".mp3" && file.file_url !== null) ||
			(file.file_extension === ".wav" && file.file_url !== null)
	);

	const result = `${storeSrc?.file_url}`;
	const srcMatch = fileArray.find(
		(file) => file.file_url === storeSrc?.file_url
	);
	const storeSrcType = srcMatch
		? storeSrc.file_extension === ".mp3"
			? "audio/mpeg"
			: "audio/wav"
		: null;

	return [result, storeSrcType];
}

export function formatLarge(num) {
	let formattedNum = "";

	if (num > 1000) {
		formattedNum = `${(num / 1000).toFixed(1)}k`;
	} else {
		formattedNum = num;
	}

	return formattedNum;
}

export function getAudioList(fileArrays) {
	const audioList = [];
	let indexCounter = 0;

	for (const files of fileArrays) {
		const storeSrc = files.find(
			(file) =>
				(file.file_extension === ".mp3" && file.file_url !== null) ||
				(file.file_extension === ".wav" && file.file_url !== null)
		);

		if (storeSrc) {
			const src = `${storeSrc.file_url}`;
			const srcType =
				storeSrc.file_extension === ".mp3" ? "audio/mpeg" : "audio/wav";
			const product_id = storeSrc.product_id;
			const index = ++indexCounter;
			audioList.push({ product_id, src, srcType, index });
		}
	}

	return audioList;
}
