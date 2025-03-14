import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput,signupInput } from '@manish98211/z-common'

const userRoutes = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string  //set the database url type to string
    },
    Variables: {
      userId: string,
    }
  }>()


userRoutes.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const success = signupInput.safeParse(body)
    if(!success.success){
      c.status(411)
      return c.json({message:"Input not correct!!"});
    }
    try {
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password
        }
      })
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
      return c.json({ jwt })
    } catch (e) {
      return c.text('Email or user already exits!!')
    }
  
  })
  
  userRoutes.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    
    const body = await c.req.json()

    const success = signinInput.safeParse(body)
    if(!success.success){
      c.status(411)
      return c.json({message:"Input not correct!!"});
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      }
    })  
    if (!user) {
      c.status(403)
      return c.text('user not found')
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt })
  })

  export default userRoutes;