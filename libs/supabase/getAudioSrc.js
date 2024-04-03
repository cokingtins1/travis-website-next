"use server";

import supabaseClient from "@/libs/supabase/config/supabaseClient";

export async function getAudioSrc(product) {
	const productId =
		typeof product === "object" ? product.product_id : product;

	// const productId = "971e7af6-4fdc-444f-a1b4-9e3826d29707";

	let fileDataObject = {};
	let storeSrc;
	let storeSrcType;

	const { data: storageKey } = await supabaseClient
		.from("product_files")
		.select(
			"file_url, file_extension, storage_key, storage_name, storage_size"
		)
		.match({ product_id: productId });

	const { data: imageSrc } = await supabaseClient
		.from("products")
		.select(
			"image_url, image_storage_name, image_storage_size, image_storage_key"
		)
		.match({ product_id: productId });

	// fileDataObject = {
	// 	basic: {
	// 		file_url:
	// 			"https://utfs.io/f/f57f8125-2433-4ec0-a2e0-a23e4b6b6a22-8ddgwh.mp3",
	// 		file_extension: ".mp3",
	// 		storage_key: "f57f8125-2433-4ec0-a2e0-a23e4b6b6a22-8ddgwh.mp3",
	// 	},
	// 	premium: {
	// 		file_url:
	// 			"https://utfs.io/f/76316ce8-2fd0-4151-b889-3df65dd53ac8-d9hohb.wav",
	// 		file_extension: ".wav",
	// 		storage_key: "76316ce8-2fd0-4151-b889-3df65dd53ac8-d9hohb.wav",
	// 	},
	// 	exclusive: {
	// 		file_url:
	// 			"https://utfs.io/f/55da2562-5ef6-4d9a-a86a-27b0e0bd40b4-uhwmh7.zip",
	// 		file_extension: ".zip",
	// 		storage_key: "55da2562-5ef6-4d9a-a86a-27b0e0bd40b4-uhwmh7.zip",
	// 	},
	// };

	if (!storageKey) return;
	storageKey.forEach((item, index) => {
		if (index === 0) {
			fileDataObject.basic = item;
		} else if (index === 1) {
			fileDataObject.premium = item;
		} else if (index === 2) {
			fileDataObject.exclusive = item;
		}
	});

	fileDataObject["image"] = {
		image_url: imageSrc[0]?.image_url,
		image_storage_name: imageSrc[0]?.image_storage_name,
		image_storage_size: imageSrc[0]?.image_storage_size,
		image_storage_key: imageSrc[0]?.image_storage_key,
	};

	storeSrc = fileDataObject.basic.file_url || fileDataObject.premium.file_url;
	storeSrcType =
		fileDataObject["basic"].file_url === storeSrc
			? "audio/mpeg"
			: "audio/wav";

	return { storeSrc, storeSrcType, fileDataObject };
}
