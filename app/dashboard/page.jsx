import Link from "next/link"

import styles from "./page.module.css"
import { Button } from "../components/UI/Button"
import Divider from '@mui/material/Divider';


import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import ProductMeta from "../components/ProductMeta/ProductMeta"
import DashboardProductCard from "../components/Dashboard Components/DashboardProductCard"

export default async function Page() {
	const supabase = createServerActionClient({ cookies })

	const { data: products } = await supabase.from("products").select()

	return (
		<>
			<section className={styles.addContent}>
				{/* {JSON.stringify(data, null, 2)} */}
				<p>Tracks</p>
				<Link href={"/dashboard/add-content"}>
					{/* <Button variant="contained">+ Add Content</Button> */}
					<Button>+ Add Content</Button>
				</Link>
			</section>

			<section>
				<div
					className="grid px-8"
					style={{ gridTemplateColumns: "2% 36% 24% 20% 18%" }}
				>
					<p className='text-text-secondary text-sm'>#</p>
					<p className='text-text-secondary text-sm'>Track Name</p>
					<p className='text-text-secondary text-sm'>Date Added</p>
					<p className='text-text-secondary text-sm'>Files</p>
					<p className='text-text-secondary text-sm'>Files</p>
				</div>
				<Divider variant='middle'/>
				<ul className="flex flex-col justify-center items-start">
					{products.map((product, index) => (
						<DashboardProductCard
							key={index}
							index={index}
							product={product}
						/>
					))}
				</ul>
			</section>
		</>
	)
}
