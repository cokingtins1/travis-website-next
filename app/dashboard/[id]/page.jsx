import ProductMeta from "@/app/components/ProductMeta/ProductMeta"
import { useSession } from "@/libs/supabase/useSession"
import { notFound, redirect } from "next/navigation"

export default async function Page({ params: { id } }) {
	const { session, supabase } = await useSession()

	if (!session) {
		redirect("/login")
	}

	const { data: product } = await supabase
		.from("products")
		.select("*")
		.match({ id })
		.single()

	if (!product) {
		notFound()
	}

	return <ProductMeta product={product} />
}
