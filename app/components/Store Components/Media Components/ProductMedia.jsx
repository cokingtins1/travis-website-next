export default function ProductMedia({ url }) {
	return (
		<div className="flex justify-center bg-bg-elevated rounded-xl">
			<iframe
                className='flex flex-1'
				width="700"
				height="480"
				src={`https://www.youtube.com/embed/${url}`}
				allowFullScreen
			/>
		</div>
	)
}
