"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = exports.blogs = void 0;
exports.blogs = [];
exports.blogsRepository = {
    blogs() {
        return exports.blogs;
    },
    createBlogs(name, description, websiteUrl) {
        const newBlog = {
            id: String(new Date().getTime()),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        exports.blogs.push(newBlog);
        return newBlog;
    },
    getBlogsById(id) {
        const blog = exports.blogs.find(elem => elem.id === String(id));
        return blog;
    },
    updateBlog(id, name, description, websiteUrl) {
        const blog = exports.blogs.find(elem => elem.id === String(id));
        if (blog) {
            blog.name = name;
            blog.description = description;
            blog.websiteUrl = websiteUrl;
            return true;
        }
        else {
            return false;
        }
    },
    deleteBlog(id) {
        for (let i = 0; i < exports.blogs.length; i++) {
            if (exports.blogs[i].id === String(id)) {
                exports.blogs.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    deleteAllBlogs() {
        exports.blogs.splice(0);
    }
};
