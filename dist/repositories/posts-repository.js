"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const posts = [];
exports.postsRepository = {
    posts() {
        return posts;
    },
    getPostById(id) {
        const post = posts.find(elem => elem.id === String(id));
        return post;
    },
    createPost(title, shortDescription, content, blogId, blogName) {
        const newPost = {
            id: String(new Date().getTime()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName
        };
        posts.push(newPost);
        return newPost;
    },
    updatePostById(id, title, shortDescription, content, blogId) {
        const post = posts.find(elem => elem.id === id);
        if (post) {
            post.title = title;
            post.shortDescription = shortDescription;
            post.content = content;
            post.blogId = blogId;
            return true;
        }
        else {
            return false;
        }
    },
    deletePost(id) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === String(id)) {
                posts.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    deleteAllPosts() {
        posts.splice(0);
    }
};
