import {blogsRouter} from "../routers/blogs-router";

type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}
const posts: postType[] = []
import {blogs, blogsRepository} from "./blogs-repository";
export  const postsRepository = {
    posts() {
        return posts
    },
    getPostById(id: number) {
        const post = posts.find(elem => elem.id === String(id))
        return post;
    },
    createPost(title: string, shortDescription: string, content:string, blogId: string, blogName:string) {

        const newPost:postType = {
            id: String(new Date().getTime()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName
        }
        posts.push(newPost)
        return newPost;
    },
    updatePostById(id: number, title: string, shortDescription: string, content:string, blogId: string, blogName: string) {
        let post = posts.find(elem => elem.id === String(id))
        if(post) {
             post.title = title
             post.shortDescription = shortDescription
             post.content = content
             post.blogId = blogId
             post.blogName = blogName
            return true;
        } else {
            return false;
        }
    },
    deletePost(id: string) {
        for(let i = 0; i < posts.length; i++) {
            if (posts[i].id === String(id)) {
                posts.splice(i,1)
                return true;
            }
        }
        return false;
    },
    deleteAllPosts() {
        posts.splice(0)
    }
}