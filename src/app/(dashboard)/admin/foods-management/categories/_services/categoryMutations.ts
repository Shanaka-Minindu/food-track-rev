import { prisma } from "@/lib/db"
import { executeAction } from "@/lib/executeAction"


const deleteCategory = async(id:number)=>{
    await executeAction({
        actionFn: ()=> prisma.category.delete({where:{id}})
    })
}

export {deleteCategory}