const {z}=require('zod')

const cheking=z.object({
    email:z.string().email().min(3).max(20),
    password:z.string().min(8).max(20)
    .refine((password)=> /[A-Z]/.test(password),{
        message:"Password should contain at least one uppercase letter"
    })
    .refine((password) => /[a-z]/.test(password), {
        message: "Password must include at least one lowercase letter",
      })
      .refine((password) => /\d/.test(password), {
        message: "Password must include at least one number",
      })
      .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
        message: "Password must include at least one special character",
      })
})

module.exports=cheking