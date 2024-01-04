import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

async function connectMongoDB(){
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('Connected to Mongo DB')
    } catch (error) {
        console.log(error)
    }
}

export default connectMongoDB