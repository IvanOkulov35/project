import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";
import {postsRepository} from "./repositories/posts-repository";
import {blogsRepository} from "./repositories/blogs-repository";
const app = express()
const port = 3000








const parserMiddleware = bodyParser({})
app.use(parserMiddleware)


/*----------------------------------------Blogs------------------------------*/
app.use('/blogs',blogsRouter)
/*----------------------------------------Posts------------------------------*/
app.use('/posts', postsRouter)
/*---------------------------------------Delete all--------------------------*/
 app.delete('/testing/all-data', (req:Request, res:Response) => {
    blogsRepository.deleteAllBlogs()
    postsRepository.deleteAllPosts()
    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})









