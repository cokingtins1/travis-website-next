import { expect, describe, it } from "vitest"

import { returnCommentAge } from '@/libs/utils'

describe("#commentAge", () => {
	it("returs 1 minute", () => {
		expect(returnCommentAge("2024-03-09 16:25:22.327584+00")).toBe('1 day ago')
	})
})
