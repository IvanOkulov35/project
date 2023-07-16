import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {authorizationValidationMiddleware} from "../midlewares/authorization";

export  const blogsRouter = Router({});



blogsRouter.get('/', (req:Request, res: Response) => {
    res.status(200).send(blogsRepository.blogs())
})

blogsRouter.post('/',
    authorizationValidationMiddleware,
    body('name').isString().trim().isLength({min: 1,max: 15}).withMessage("name  is too long"),
    body("description").isString().trim().isLength({min: 1,max:500}).withMessage("description is too long"),
    body("websiteUrl").isString().trim().isLength({min: 1,max:100}).withMessage("websiteUrl is too long"),
    body("websiteUrl").isURL().withMessage("website url does not match the template"),
    inputValidationMiddleware,
    (req:Request, res: Response) => {

   const newBlog =  blogsRepository.createBlogs(req.body.name, req.body.description, req.body.websiteUrl)
    res.status(201).send(newBlog)
})


blogsRouter.get('/:id', (req:Request, res: Response) => {
const blog = blogsRepository.getBlogsById(req.params.id)
    if(blog) {
        res.status(200).send(blog )
    } else {
        res.sendStatus(404)
    }
})

blogsRouter.put('/:id',
    authorizationValidationMiddleware,
    body('name').isString().trim().isLength({min: 1, max: 15}).withMessage("name  is too long"),
    body("description").isString().trim().isLength({min: 1,max:500}).withMessage("description is too long"),
    body("websiteUrl").isString().trim().isLength({min: 1,max:100}).withMessage("websiteUrl is too long"),
    body("websiteUrl").isURL().withMessage("website url does not match the template"),
    inputValidationMiddleware,
    (req:Request, res: Response) => {
const isUpdated  = blogsRepository.updateBlog(+req.params.id, req.body.name, req.body.description, req.body.websiteUrl )
 if(isUpdated) {

     res.sendStatus(204)
 } else {
     res.sendStatus(404)
 }
})


blogsRouter.delete('/:id',
    authorizationValidationMiddleware,
    (req:Request, res: Response) => {
 const isDeleted = blogsRepository.deleteBlog(+req.params.id)
 if (isDeleted) {
    res.send(204)
 } else {
    res.send(404)
 }
})



