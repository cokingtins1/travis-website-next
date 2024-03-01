"use server"

import { addLike } from '@/libs/supabase/supabaseQuery'
import { revalidatePath } from "next/cache"


export const submitLike = async (formData) => {
    const product_id = formData.get('id')
    await addLike(product_id)

    revalidatePath("/store")
}