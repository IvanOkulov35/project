import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {blogs, blogsRepository} from "../repositories/blogs-repository";
import {authorizationValidationMiddleware} from "../midlewares/authorization";
export const postsRouter = Router ({})

postsRouter.get('/', (req:Request, res: Response) => {
    res.status(200).send(postsRepository.posts())
})

postsRouter.get('/:id', (req:Request, res: Response) => {
    let postsId = postsRepository.getPostById(+req.params.id)
    if(postsId) {
        res.status(200).send(postsId)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.post('/',
    authorizationValidationMiddleware,
    body('title').isString().trim().isLength({min: 1, max: 30}).withMessage("post is too long"),
    body("shortDescription").isString().trim().isLength({min: 1, max: 100}).withMessage("shortDescription is too long"),
    body("content").isString().trim().isLength({min: 1, max: 1000}).withMessage("content is too long"),
    body("blogId").isString().trim().notEmpty().withMessage("incorrect blogId").custom((id, req) => {
        const postUpdate = blogs.find(b => b.id === id)
        if(!postUpdate) {
            throw  new Error("blog not found")
        } else {
            req.req.body.blogName = postUpdate.name
            return true;
        }
    }),
    inputValidationMiddleware,
    (req:Request, res: Response) => {
 const post = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName)

    res.status(201).send(post)
})

postsRouter.put('/:id',
    authorizationValidationMiddleware,
    body('title').isString().trim().isLength({min:10, max: 30}).withMessage("post is too long"),
    body("shortDescription").isString().trim().isLength({min: 10, max: 100}).withMessage("shortDescription is too long"),
    body("content").isString().trim().isLength({min: 100, max: 1000}).withMessage("content is too long"),
    body("blogId").isString().trim().notEmpty().withMessage("incorrect blogId").custom((id, req) => {
        const postUpdate = blogs.find(b => b.id === id)
        if(!postUpdate) {
            throw  new Error("blog not found")
        } else {
            req.req.body.blogName = postUpdate.name
            return true;
        }
    }),
    (req:Request, res: Response) => {
    const isUpdate = postsRepository.updatePostById(req.params.id,req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    if(isUpdate) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

})


postsRouter.delete('/:id',
    authorizationValidationMiddleware,
    (req:Request, res: Response) => {
  const isDeleted = postsRepository.deletePost(req.params.id)
    if(isDeleted) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})







