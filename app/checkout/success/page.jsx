import CheckoutOrder from "@/app/components/Checkout Component/CheckoutOrder"
import { getSupabaseOrderData } from "@/libs/supabase/supabaseQuery"

export default async function Page({ searchParams }) {
	const { orderData, orderAlias } = await getSupabaseOrderData(
		searchParams.session_id
	)

	const email = "cokingtins1@gmail.com"

	return (
		<main className="flex justify-center items-center">
			<CheckoutOrder
				orderDetails={orderData}
				orderNumber={orderAlias}
				email={email}
			/>
		</main>
	)
}
