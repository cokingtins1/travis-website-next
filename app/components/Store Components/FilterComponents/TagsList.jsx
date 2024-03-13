import { useSearch } from "@/libs/contexts/SearchContext"
import Button from "@mui/material/Button"

export default function TagsList({ tag }) {
	const { updateQueryParam } = useSearch()

	return (
		<li>
			<Button
				onClick={() => {
					updateQueryParam("tags", tag)
				}}
			>
				{tag}
			</Button>
		</li>
	)
}
