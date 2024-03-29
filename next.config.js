/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "njowjcfiaxbnflrcwcep.supabase.co",
				pathname: "/storage/v1/object/public/all_products/**",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
			},
		],
	},
};

module.exports = nextConfig;

// utfs.io
