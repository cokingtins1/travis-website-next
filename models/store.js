import mongoose, { Schema } from "mongoose"

const productSchema = new Schema(
	{
		productName: { type: String, required: true },
		cost: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
)

const Product =
	mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product
