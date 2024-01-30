import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import parse from "autosuggest-highlight/parse"
import match from "autosuggest-highlight/match"

export default function FilterSection() {
	return (
		<Autocomplete
			id="highlights-demo"
			sx={{ width: 300 }}
			options={top100Films}
			getOptionLabel={(option) => option.title}
			renderInput={(params) => (
				<TextField {...params} label="Highlights" margin="normal" />
			)}
			renderOption={(props, option, { inputValue }) => {
				const matches = match(option.title, inputValue, {
					insideWords: true,
				})
				const parts = parse(option.title, matches)

				return (
					<li {...props}>
						<div>
							{parts.map((part, index) => (
								<span
									key={index}
									style={{
										fontWeight: part.highlight ? 700 : 400,
									}}
								>
									{part.text}
								</span>
							))}
						</div>
					</li>
				)
			}}
		/>
	)
}
