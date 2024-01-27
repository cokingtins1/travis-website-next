import Link from "next/link"

import styles from "./page.module.css"
import DummyProductCard from "@/app/components/DummyComponents/DummyProductCard"
import { Button } from "../components/UI/Button"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import ProductMeta from "../components/ProductMeta/ProductMeta"

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
				<ul className={styles.productGrid}>
					{products.map((product, index) => (
						<DummyProductCard
							key={index}
							title={product.title}
							id={product.id}
						/>
					))}
					{/* <DummyProductCard />
					<DummyProductCard />
					<DummyProductCard />
					<DummyProductCard />
					<DummyProductCard />
					<DummyProductCard />
					<DummyProductCard />
					<DummyProductCard /> */}
				</ul>
			</section>
		</>
	)
}
