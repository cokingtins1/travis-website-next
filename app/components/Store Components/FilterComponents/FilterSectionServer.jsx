import FilterDropDownServer from "../../UI/FilterDropDownServer"

export default function FilterSectionServer({ genres, moods, instruments }) {
	return (
		<div className="w-full flex justify-start items-center gap-4 bg-bg-elevated p-4">
			<FilterDropDownServer label="GENRE" items={genres} />
			<FilterDropDownServer label="MOODS" items={moods} />
			<FilterDropDownServer label="INSTRUMENTS" items={instruments} />
		</div>
	)
}
