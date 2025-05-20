import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@manish98211/z-common'
import { error } from 'console'

const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string,
  }
}>()


//middleWare
blogRoutes.use(async (c, next) => {
  const auth = c.req.header('Authorization')
  if (!auth) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const token = auth.split(' ')[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  // console.log('JWT Payload:', payload);

  if (!payload) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  c.set('userId', payload.id as string);
  await next();
})


//create
blogRoutes.post('/', async (c) => {
  const userId = c.get('userId');
  if (!userId) {
    return c.json({ message: "User ID not found in context" }, 401);
  }
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
      published:true,
      draft:false
    }
  })
  return c.json({ id: post.id })
})


//update
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


//get all
blogRoutes.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.post.findMany({
      select:{
        id:true,
        content:true,
        title:true,
        createdAt:true,
        published:true,
        draft:true,
        author:{
          select:{
            name:true,
          }
        }
            }
    });
    return c.json(posts)
  } catch (e) {
    console.error(e);
    return c.json({ error: "error fetching data" })
  }
})


//get  By Id
blogRoutes.get('/:id', async (c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findUnique({
      where: {
        id
      },
      select:{
        id:true,
        content:true,
        title:true,
        createdAt:true,
        author:{
          select:{
            name:true,
          }
        }
            }
    })
    // console.log(id);
    return c.json(post)
  } catch {
    return c.json({ error: "post not found" })
  }
})

//delete 
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


//save draft
blogRoutes.put('/draft', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json()
  try {
    if(body.id){
      const success = updateBlogInput.safeParse(body)
      if (!success.success) {
        c.status(411)
        return c.json({ message: "Input not correct!!" });
      }
       const updatedPost = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title || undefined,
        content: body.content || undefined,
        draft: true,
        published: false,
      }
    })
    return c.json({
      id: updatedPost.id,
      message: "post saved as draft"
    })
    }else{
      const success = createBlogInput.safeParse(body)
      console.log(success.success)
      if (!success.success) {
        c.status(411)
        return c.json({ message: "Input not correct!!" });
      }
      const post = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content || undefined,
          authorId: userId,
          draft: true,
          published: false,
        }
      })
      console.log(post);
      return c.json({ id: post.id })
    }

   
  }catch (err){
    console.error(err);
    return c.json({ error: "Failed to save draft", message: err }, 500);
  }

})



export default blogRoutes;