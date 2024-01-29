import postgres from "postgres"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

const sql = postgres(supabaseUrl)

export default sql
