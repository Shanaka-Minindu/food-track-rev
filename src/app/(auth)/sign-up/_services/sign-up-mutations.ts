
import { executeAction } from "@/lib/executeAction"
import { signUpSchema, SignUpSchema } from "../_types/signUpSchema"
import { hashedPassword } from "@/lib/utils"
import { prisma } from "@/lib/db"

const signUp = async (data:SignUpSchema) =>{
    await executeAction({
        actionFn: async ()=>{
            const validatedData = signUpSchema.parse(data);
            const hashPassword = await hashedPassword(validatedData.password);

            await prisma.user.create({
                data:{
                    name : validatedData.name,
                    email: validatedData.email,
                    password: hashPassword,
                    role:"USER"

                }
            })
        }
    })
}

export {signUp}