 import z from 'zod'
  
 export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(3)
 })

 export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
 })

 export const createBlogInput= z.object({
    title: z.string().min(3),
    content: z.string().min(10)
 })
 export const updateBlogInput = z.object({
    title: z.string().min(3).optional(),
    content: z.string().min(10).optional(),
    id: z.string().uuid()
 })

 export type SignupInput = z.infer<typeof signupInput>
 export type SignInput = z.infer<typeof signinInput>
 export type CreateBlogInput = z.infer<typeof createBlogInput>
 export type UpdateBlogInput = z.infer<typeof updateBlogInput>

