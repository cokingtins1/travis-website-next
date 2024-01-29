import { createClient } from "@supabase/supabase-js"

// import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
// import { cookies } from "next/headers"

// // // "use client"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// // // "use server"
// // // console.log(process.env.SUPABASE_URL)

// // const supabaseUrl = process.env.SUPABASE_URL
// // const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabaseClient = createClient(supabaseUrl, supabaseKey)
// const supabase = createServerActionClient({ cookies })


export default supabaseClient
