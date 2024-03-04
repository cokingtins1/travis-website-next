import { getDownloadUrls } from "@/libs/supabase/supabaseQuery"
import Button from "@mui/material/Button"
import EmailBody from "../components/Email Components/EmailBody"
import DownloadButtons from "../components/Email Components/downloadButtons"
// import { renderToString } from "react-dom/server"

export default function Page() {
	const array = [
		{
			"Product 1": {
				productId: "50214d45-a6cf-40f5-a251-798445690db7",
				pricingId: "3e5d7899-d204-4b6c-b669-0a110fe50867",
				productName:
					"Avec Toi 91 BPM - @1trav x Trevbaj (Drake)_Master",
				type: "PREMIUM",
				price: "50",
				filePath:
					"50214d45-a6cf-40f5-a251-798445690db7/3e5d7899-d204-4b6c-b669-0a110fe50867",
				imageSrc:
					"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/50214d45-a6cf-40f5-a251-798445690db7/productImage/80e0c87f16aed3b398f1276cf59df9fb.jpg",
			},
		},
		{
			"Product 2": {
				productId: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
				pricingId: "e004ee31-3994-4c47-a66f-c9c676cbd195",
				productName: "Nonstop",
				type: "BASIC",
				price: "30",
				filePath:
					"fa6255df-90cd-4ba2-b6b5-708c86dffa39/e004ee31-3994-4c47-a66f-c9c676cbd195",
				imageSrc:
					"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/fa6255df-90cd-4ba2-b6b5-708c86dffa39/productImage/af4181133125831.61b74094919a9.jpg",
			},
		},
		{
			"Product 3": {
				productId: "e35cd64a-cd05-4c16-8fed-1e03a2b604f6",
				pricingId: "283656bd-aa8d-461b-9c4f-799f285c87c3",
				productName: "Street Council",
				type: "PREMIUM",
				price: "250",
				filePath:
					"e35cd64a-cd05-4c16-8fed-1e03a2b604f6/283656bd-aa8d-461b-9c4f-799f285c87c3",
				imageSrc:
					"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/e35cd64a-cd05-4c16-8fed-1e03a2b604f6/productImage/canva-raven-gothic-music-album-cover-art-aXKmEoNJThg.jpg",
			},
		},
	]


	return <div></div>
}
