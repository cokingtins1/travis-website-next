import CheckoutOrder from "@/app/components/Checkout Component/CheckoutOrder"
import { getSupabaseOrderData } from "@/libs/supabase/supabaseQuery"

export default async function Page({ searchParams }) {
	const orderData = await getSupabaseOrderData(searchParams.session_id)

	return (
		<main className="flex justify-center items-center">
			<CheckoutOrder orderDetails={orderData} />
		</main>
	)
}
