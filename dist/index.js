"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const blogs_router_1 = require("./routers/blogs-router");
const posts_router_1 = require("./routers/posts-router");
const posts_repository_1 = require("./repositories/posts-repository");
const blogs_repository_1 = require("./repositories/blogs-repository");
const app = (0, express_1.default)();
const port = 3000;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
/*----------------------------------------Blogs------------------------------*/
app.use('/blogs', blogs_router_1.blogsRouter);
/*----------------------------------------Posts------------------------------*/
app.use('/posts', posts_router_1.postsRouter);
/*---------------------------------------Delete all--------------------------*/
app.delete('/testing/all-data', (req, res) => {
    blogs_repository_1.blogsRepository.deleteAllBlogs();
    posts_repository_1.postsRepository.deleteAllPosts();
    res.sendStatus(204);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
