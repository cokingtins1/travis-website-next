import SearchIcon from "@mui/icons-material/Search"

export default function SearchBar({ query, setQuery }) {
	return (
		<form
			className="w-full flex gap-2"
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<input
				className="text-black border border-border-primary rounded-full p-1/4 p-4 h-12 flex-1 "
				type="text"
				placeholder="Search"
				id="search"
				autoComplete="off"
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
