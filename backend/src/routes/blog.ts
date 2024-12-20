import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from "@aditya6112/zod-validation";
export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: String
    }
}>();

//middleware
blogRoute.use('/*', async (c, next) => {
    //extract the user id
    //pass down to the route handler
    const authHeader = c.req.header("Authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            //@ts-ignore
            c.set("userId", user.id);
            await next()
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "Unauthorized"
        })
    }
});

blogRoute.post('/', async (c) => {
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());


    const body = await c.req.json();
    const {success}=createPostInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({ error: 'Invalid input' });
    }
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            //@ts-ignore
            authorId: authorId
        }
    })
    return c.json({
        id: blog.id
    })

})

blogRoute.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({error: "Invalid input"})
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: blog.id
    })
})

//pagination implement is a good thing

blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    return c.json({
        blogs
    })
})

blogRoute.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const id = c.req.param('id');
        const blog = await prisma.post.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content:true,
                author:{
                    select:{
                        name: true,
                    }
                }
            }
        })
        return c.json({
            blog
        })
    } catch (e) {
        c.status(500);
        return c.json({
            message: "Error while fetching the blog post"
        })
    }

})

