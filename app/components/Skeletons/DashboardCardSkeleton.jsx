import Divider from "@mui/material/Divider"

export default function DashboardCardSkeleton() {
	return (
		<>
			<li
				className="animate-pulse w-full items-center grid rounded hover:bg-bg-hover px-8 py-2"
				style={{ gridTemplateColumns: "3% 55% 13% 15% 14%" }}
			>
				<div className="bg-slate-700 text-sm"></div>
				<div className="flex gap-4 justify-start items-center rounded-md bg-slate-700 size-[40px]">
				</div>
				<div className="h-4 bg-slate-700 rounded mr-4"></div>
				<div className="h-4 bg-slate-700 rounded mr-4"></div>
				<div className="h-4 bg-slate-700 rounded mr-4"></div>
			</li>
		</>
	)
}
