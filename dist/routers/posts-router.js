"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../midlewares/input-validation-middleware");
const blogs_repository_1 = require("../repositories/blogs-repository");
const authorization_1 = require("../midlewares/authorization");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get('/', (req, res) => {
    res.status(200).send(posts_repository_1.postsRepository.posts());
});
exports.postsRouter.get('/:id', (req, res) => {
    let postsId = posts_repository_1.postsRepository.getPostById(+req.params.id);
    if (postsId) {
        res.status(200).send(postsId);
    }
    else {
        res.sendStatus(404);
    }
});
exports.postsRouter.post('/', authorization_1.authorizationValidationMiddleware, (0, express_validator_1.body)('title').isString().trim().isLength({ min: 1, max: 30 }).withMessage("post is too long"), (0, express_validator_1.body)("shortDescription").isString().trim().isLength({ min: 1, max: 100 }).withMessage("shortDescription is too long"), (0, express_validator_1.body)("content").isString().trim().isLength({ min: 1, max: 1000 }).withMessage("content is too long"), (0, express_validator_1.body)("blogId").isString().trim().notEmpty().withMessage("incorrect blogId").custom((id, req) => {
    const postUpdate = blogs_repository_1.blogs.find(b => b.id === id);
    if (!postUpdate) {
        throw new Error("blog not found");
    }
    else {
        req.req.body.blogName = postUpdate.name;
        return true;
    }
}), input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const post = posts_repository_1.postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName);
    res.status(201).send(post);
});
exports.postsRouter.put('/:id', authorization_1.authorizationValidationMiddleware, (0, express_validator_1.body)('title').isString().trim().isLength({ min: 1, max: 30 }).withMessage("post is too long"), (0, express_validator_1.body)("shortDescription").isString().trim().isLength({ min: 1, max: 100 }).withMessage("shortDescription is too long"), (0, express_validator_1.body)("content").isString().trim().isLength({ min: 1, max: 1000 }).withMessage("content is too long"), (0, express_validator_1.body)("blogId").isString().trim().notEmpty().withMessage("incorrect blogId").custom((id, req) => {
    const postUpdate = blogs_repository_1.blogs.find(b => b.id === id);
    if (!postUpdate) {
        throw new Error("blog not found");
    }
    else {
        req.req.body.blogName = postUpdate.name;
        return true;
    }
}), (req, res) => {
    const isUpdate = posts_repository_1.postsRepository.updatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (isUpdate) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
exports.postsRouter.delete('/:id', authorization_1.authorizationValidationMiddleware, (req, res) => {
    const isDeleted = posts_repository_1.postsRepository.deletePost(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
