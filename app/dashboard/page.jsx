import Link from "next/link";

import styles from "./page.module.css";
import { Button } from "../components/UI/Button";
import Divider from "@mui/material/Divider";

import DashboardProductCard from "../components/Dashboard Components/DashboardProductCard";
import { getAllProductData } from "@/libs/supabase/supabaseQuery";
import { Suspense } from "react";
import DashboardCardSkeleton from "../components/Skeletons/DashboardCardSkeleton";

export default async function Page() {
	const products = await getAllProductData();

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
					style={{ gridTemplateColumns: "3% 55% 13% 15% 14%" }}
				>
					<p className="text-text-secondary text-sm">#</p>
					<p className="text-text-secondary text-sm">Track Name</p>
					<p className="text-text-secondary text-sm">Date Added</p>
					<p className="text-text-secondary text-sm"></p>
					<p className="text-text-secondary text-sm">Plays</p>
				</div>
				<Divider variant="middle" />
				{!products && (
					<h1>
						Connection to Database failed. Check interenet
						connection
					</h1>
				)}
				<ul className="flex flex-col justify-center items-start">
					{products?.map((product, index) => (
						<Suspense
							key={index}
							fallback={<DashboardCardSkeleton />}
						>
							<DashboardProductCard
								key={index}
								index={index}
								product={product}
							/>
						</Suspense>
					))}
				</ul>
			</section>
		</>
	);
}
