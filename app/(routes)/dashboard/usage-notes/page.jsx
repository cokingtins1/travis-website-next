export default function Page() {
	return (
		<main className="p-4">
			<h1 className="text-2xl">Usage Notes</h1>
			<section className="ml-8 mt-4">
				<ol className="list-decimal">
					<li className="mt-4 text-lg">
						Uploading Files:
						<ul className="space-y-2 list-disc ml-4 mt-2 text-base">
							<li>
								You must include an MP3 file with each upload.
								Preferably a tagged version, the site will be
								streaming from this file for the playback
								functionality. Technically, someone could trace
								the source of this file and download it for
								free, but since you are not selling MP3s, it
								does not matter. As a fallback, the WAV file will
								be used for playback, but again, someone could
								technically trace the source and download it for
								free.
							</li>
							<li>
								When uploading files, wait for all files to
								finish uploading before navigating to the next
								step. This ensures the files upload to the
								database correctly.{" "}
							</li>
						</ul>
					</li>
					<li className="mt-4 text-lg">
						Uploading Pictures:
						<ul className="space-y-2 list-disc ml-4 mt-2 text-base">
							<li>
								Portrait orientation works best for pictures.
							</li>
						</ul>
					</li>
					<li className="mt-4 text-lg">
						Editing Files
						<ul className="space-y-2 list-disc ml-4 mt-2 text-base">
							<li>
								Changing the name of the beat under &quot;Product
								Metadata&quot; will not change the name of the file.
								You need to re-upload the respective files in
								order to change their names.
							</li>
						</ul>
					</li>
				</ol>
			</section>
		</main>
	);
}
