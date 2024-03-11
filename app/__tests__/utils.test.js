import { expect, describe, it } from "vitest"
import { createFormData, returnArray, returnCommentAge } from "@/libs/utils"

import dayjs from "dayjs"

describe("#commentAge", () => {
	function convertTime(value, unit) {
		const now = dayjs()
		return dayjs(now)
			.subtract(value, unit)
			.format("YYYY-MM-DD HH:mm:ss.SSSSSSZ")
	}

	const times = {
		test1: {
			value: convertTime(15, "second"),
			expected: "15 seconds ago",
		},
		test2: {
			value: convertTime(1, "minute"),
			expected: "1 minute ago",
		},
		test3: {
			value: convertTime(1.5, "minute"),
			expected: "2 minutes ago",
		},
		test4: {
			value: convertTime(2, "minute"),
			expected: "2 minutes ago",
		},
		test5: {
			value: convertTime(1, "hour"),
			expected: "1 hour ago",
		},
		test6: {
			value: convertTime(2, "hour"),
			expected: "2 hours ago",
		},
		test7: {
			value: convertTime(2, "minute"),
			expected: "2 minutes ago",
		},
		test8: {
			value: convertTime(1, "day"),
			expected: "1 day ago",
		},
		test9: {
			value: convertTime(1.5, "week"),
			expected: "1 week ago",
		},
		test10: {
			value: convertTime(8, "week"),
			expected: "8 weeks ago",
		},
		test11: {
			value: convertTime(1, "year"),
			expected: "1 year ago",
		},
	}

	for (const key in times) {
		const { value, expected } = times[key]

		it(`returns ${expected} for ${key}`, () => {
			expect(returnCommentAge(value)).toBe(expected)
		})
	}
})

describe("return array", () => {
	const input = {
		genres: [
			{ name: "Balls", id: "1" },
			{ name: "Big Balls", id: "2" },
			{ name: "RAP", id: "3" },
			{ name: "alternative rock", id: "4" },
			{ name: "METAL", id: "5" },
			{ name: "peace", id: "6" },
			{ name: "r&b  ", id: "7" },
		],
	}

	const formData = createFormData(input)

	it("returns an array in proper case", () => {
		expect(returnArray("genres", formData)).toStrictEqual([
			"Balls",
			"Big Balls",
			"Rap",
			"Alternative Rock",
			"Metal",
			"Peace",
			"R&b",
		])
	})

	// it("returns an array in proper case", () => {
	// 	expect(createFormData("genres", formData)).toBe([
	// 		"Balls",
	// 		"Big Balls",
	// 		"R&B",
	// 		"HIP HOP",
	// 		"Balls Balls",
	// 	])
	// })
})
