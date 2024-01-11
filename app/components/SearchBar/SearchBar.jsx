import SearchIcon from "@mui/icons-material/Search"

export default function SearchBar({
	query,
	setQuery,
}) {


	return (
		<form
			className=" flex gap-2"
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<input
				className="border border-black rounded-full p-1/4 p-4 min-w-100 max-w-350 h-12 flex-1 "
				type="text"
				placeholder="Search"
				id="search"
				value={query}
				onChange={(e) => {
					setQuery(e.target.value)
				}}
			/>
			<button
				type="submit"
				className="border border-black rounded-2xl w-12 h-12 p-2"
			>
				<SearchIcon />
			</button>
		</form>
	)
}
