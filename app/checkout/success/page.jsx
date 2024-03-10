import CheckoutOrder from "@/app/components/Checkout Component/CheckoutOrder"
import { getSupabaseOrderData } from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"


export default async function Page({ searchParams }) {
	const orderData = await getSupabaseOrderData(
		searchParams.session_id
	)

	if(!orderData){
		notFound()
	}

	const email = "cokingtins1@gmail.com"

	return (
		<main className="flex justify-center items-center">
			<CheckoutOrder
				orderDetails={orderData}
				orderNumber={5302}
				email={email}
			/>
		</main>
	)
}
