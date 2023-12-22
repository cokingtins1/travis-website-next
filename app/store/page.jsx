import FilterComponent from "../components/FilterComponent"
import ProductCard from "../components/ProductCard/ProcudtCard"
import styles from "@/app/store/store.modules.css"

export default function Store() {
	return (
		<>
			<main>
				<div className="hero-section"></div>
				<button className="filterButton">Sort and Filter</button>
				<div className="product-section">
					<div className="filter-grid">
						<FilterComponent />
					</div>
					<div className="product-grid">
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</div>
				</div>
			</main>
		</>
	)
}
