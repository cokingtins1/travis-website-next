import CommentSection from "@/app/components/Store Components/Comments Component/CommentSection"
import ProductMedia from "@/app/components/Store Components/Media Components/ProductMedia"

import ProductMeta from "@/app/components/Store Components/ProductMeta/ProductMeta"
import {
	getAudioSrcById,
	getComments,
	getImageSrc,
	getPricingById,
	getProductById,
	getReplys,
	getUserId,
} from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import AudioPlayStore from "@/app/components/Audio/AudioPlayStore"
import { useSession } from "@/libs/supabase/useSession"

export default async function Page({ params: { id } }) {
	const product = await getProductById(id)
	// const imageSrc = await getImageSrc(id)
	const imageSrc = product.image_name
	const { filteredPricing } = await getPricingById(id)
	const storeSrc = await getAudioSrcById(id)
	const storeSrcType = await getAudioSrcById(id)
	const { session } = await useSession()
	const comments = await getComments(id)
	const replies = await getReplys(id)

	const DynamicPricing = dynamic(
		() =>
			import(
				"@/app/components/Store Components/Pricing Component/PricingSection"
			),
		{
			ssr: false,
		}
	)

	if (!product) {
		notFound()
	}

	const media = {
		mainLg: "lg:grid-cols-12",
		metaLg: "lg:col-span-3 px-2",
		pricingLg: "lg:col-span-9 px-2",
	}

	return (
		<>
			<main
				className={`grid grid-cols-8 px-4 pt-4 gap-4 ${media.mainLg} `}
			>
				<section
					className={`grid content-start col-span-8 px-10 ${media.metaLg} `}
				>
					<ProductMeta imageSrc={imageSrc} product={product} />
				</section>

				<section
					className={`grid content-start col-span-8 px-10 gap-4 ${media.pricingLg} `}
				>
					<section className="bg-bg-elevated rounded-xl p-4">
						{storeSrc && storeSrcType && (
							<AudioPlayStore
								audioSrc={storeSrc.storeSrc}
								audioSrcType={storeSrcType.storeSrcType}
								product={product}
							/>
						)}
					</section>
					<Suspense fallback={<div className="h-[280px]"></div>}>
						<DynamicPricing
							product={product}
							pricing={filteredPricing}
							imageSrc={imageSrc}
						/>
					</Suspense>

					<section>
						<CommentSection
							productId={id}
							session={session}
							comments={comments}
							replies={replies}
							activeUser_email={session?.user.email}
							activeUser_id={session?.user.id}
						/>
					</section>

					<section className="bg-bg-elevated h-[300px]"></section>

					<Suspense fallback={<p>Loading video...</p>}>
						{/* <ProductMedia url="btyS_uiRLnU" /> */}
					</Suspense>
				</section>
			</main>
		</>
	)
}
