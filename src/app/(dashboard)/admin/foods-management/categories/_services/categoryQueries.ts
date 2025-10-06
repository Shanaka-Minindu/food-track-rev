"use server"

import { prisma } from "@/lib/db"


const getCategories= async()=>{
    return await prisma.category.findMany();
}

export {getCategories}