import postgres from "postgres"

const supabaseUrl = process.env.DATABASE_URL
const sql = postgres(supabaseUrl)

export default sql
