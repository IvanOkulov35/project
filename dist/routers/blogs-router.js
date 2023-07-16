"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../midlewares/input-validation-middleware");
const authorization_1 = require("../midlewares/authorization");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => {
    res.status(200).send(blogs_repository_1.blogsRepository.blogs());
});
exports.blogsRouter.post('/', authorization_1.authorizationValidationMiddleware, (0, express_validator_1.body)('name').isString().trim().isLength({ min: 1, max: 15 }).withMessage("name  is too long"), (0, express_validator_1.body)("description").isString().trim().isLength({ min: 1, max: 500 }).withMessage("description is too long"), (0, express_validator_1.body)("websiteUrl").isString().trim().isLength({ min: 1, max: 100 }).withMessage("websiteUrl is too long"), (0, express_validator_1.body)("websiteUrl").isURL().withMessage("website url does not match the template"), input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const newBlog = blogs_repository_1.blogsRepository.createBlogs(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(newBlog);
});
exports.blogsRouter.get('/:id', (req, res) => {
    const blog = blogs_repository_1.blogsRepository.getBlogsById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
    }
    else {
        res.sendStatus(404);
    }
});
exports.blogsRouter.put('/:id', authorization_1.authorizationValidationMiddleware, (0, express_validator_1.body)('name').isString().trim().isLength({ min: 1, max: 15 }).withMessage("name  is too long"), (0, express_validator_1.body)("description").isString().trim().isLength({ min: 1, max: 500 }).withMessage("description is too long"), (0, express_validator_1.body)("websiteUrl").isString().trim().isLength({ min: 1, max: 100 }).withMessage("websiteUrl is too long"), (0, express_validator_1.body)("websiteUrl").isURL().withMessage("website url does not match the template"), input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const isUpdated = blogs_repository_1.blogsRepository.updateBlog(+req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (isUpdated) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
exports.blogsRouter.delete('/:id', authorization_1.authorizationValidationMiddleware, (req, res) => {
    const isDeleted = blogs_repository_1.blogsRepository.deleteBlog(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
