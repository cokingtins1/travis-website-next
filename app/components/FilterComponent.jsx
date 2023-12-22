"use client"

import CheckBox from './Checkbox/Checkbox'

export default function FilterComponent() {
	return (
		<>
			<div className="flex flex-col border border-slate-500 gap-0 "  >
                <CheckBox/>
                <CheckBox/>
                <CheckBox/>
                <CheckBox/>
			</div>
		</>
	)
}
