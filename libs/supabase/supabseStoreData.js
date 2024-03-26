"use server";

import supabaseClient from "@/libs/supabase/config/supabaseClient";
import { useSession } from "./useSession";
import { likedByUser } from "./supabaseQuery";
import { unstable_cache } from "next/cache";

async function getAllProductData() {
	const { data, error } = await supabaseClient.rpc("get_product_data");
	return data;
}

export const constructData = unstable_cache(
	async () => {
		const data = await getAllProductData();
		const { session } = await useSession();

		const userId = session?.user.id;

		const likeData = await likedByUser();

		for (const item of data) {
			const activePrices = item.pricing.filter(
				(price) => price.is_active
			);

			const lowestPriceObject = activePrices.reduce(
				(minPriceObject, currentPriceObject) =>
					currentPriceObject.price < minPriceObject.price
						? currentPriceObject
						: minPriceObject,
				activePrices[0]
			);

			item.startingPrice = lowestPriceObject;

			const isFree = item.product_data.free;
			item.isFree = isFree;

			const productLikes = item.product_likes.likes;
			item.productLikes = productLikes;

			if (session) {
				const likedByArray = likeData.find(
					(p) => p.product_id === item.product_data.product_id
				);

				const likedByUser = likedByArray.liked_by_id.includes(userId);

				item.session = session;
				item.likedByUser = likedByUser;
			} else {
				item.likedByUser = false;
				item.session = null;
			}
		}

		return data;
	},
	["products"],
	{ tags: ["products"] }
);
