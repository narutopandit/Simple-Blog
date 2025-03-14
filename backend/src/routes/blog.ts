import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@manish98211/z-common'

const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string,
  }
}>()

blogRoutes.use('/api/v1/blog/*', async (c, next) => {
  // Skip middleware for bulk route
  if (c.req.path.endsWith('/bulk')) {
    return next();
  }
  const auth = c.req.header('Authorization')
  if (!auth) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const token = auth.split(' ')[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  c.set('userId', payload.id as string);
  await next();
})

blogRoutes.post('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json()
  const success = createBlogInput.safeParse(body)
  if (!success.success) {
    c.status(411)
    return c.json({ message: "Input not correct!!" });
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    }
  })
  return c.json({ id: post.id })
})

blogRoutes.put('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json()
  const success = updateBlogInput.safeParse(body)
  if (!success.success) {
    c.status(411)
    return c.json({ message: "Input not correct!!" });
  }
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title || undefined,
        content: body.content || undefined,
      }
    })
    return c.json({
      id: updatedPost.id,
      message: "post updated"
    })
  } catch {
    return c.json({ error: "post not found" })
  }

})

blogRoutes.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.post.findMany();
    return c.json(posts)
  } catch (e) {
    console.error(e);
    return c.json({ error: "error fetching data" })
  }
})

blogRoutes.get('/:id', async (c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findUnique({
      where: {
        id
      }
    })
    // console.log(id);
    return c.json(post)
  } catch {
    return c.json({ error: "post not found" })
  }
})
blogRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.delete({
      where: {
        id
      }
    })
    // console.log(id);
    return c.json(post)
  } catch {
    return c.json({ error: "post not found" })
  }
})

export default blogRoutes;