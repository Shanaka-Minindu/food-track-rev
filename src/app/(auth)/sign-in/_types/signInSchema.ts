import z from "zod";



const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

type SignInSchema = z.infer<typeof signInSchema>

const signInDefaultValue : SignInSchema={
    email:"",
    password: ""
}

export {signInSchema, type SignInSchema, signInDefaultValue}