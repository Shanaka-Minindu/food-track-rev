import { passwordSchema, requiredStringSchema } from "@/lib/zodSchema";
import z from "zod";


const signUpSchema = z.object(
    {
        name: requiredStringSchema,
        email : z.string().email(),
        password: passwordSchema,
        confirmPassword : z.string(),
    }
).refine((data)=>data.password=== data.confirmPassword,{
    message : "Password does not match",
    path: ["confirmPassword"],
});

type SignUpSchema = z.infer<typeof signUpSchema>


const signUpDefaultValue: SignUpSchema = {
    name : "",
    email : "",
    password : "",
    confirmPassword : ""
}

export {signUpSchema, type SignUpSchema, signUpDefaultValue}