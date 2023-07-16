type blogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}
export const blogs: blogType[] = []
export const blogsRepository = {
    blogs () {
        return blogs
    },
    createBlogs(name: string, description: string, websiteUrl: string) {
        const newBlog:blogType = {
            id: String(new Date().getTime()),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogs.push(newBlog)
         return newBlog
    },
    getBlogsById(id: string) {
        const blog = blogs.find(elem => elem.id === String(id))
        return blog;
    },
    updateBlog(id: number, name: string, description: string, websiteUrl: string) {
        const blog = blogs.find(elem => elem.id === String(id) )
        if(blog) {
             blog.name = name
             blog.description = description
             blog.websiteUrl = websiteUrl
            return true;
        } else {
            return false;
        }
    },
    deleteBlog(id: number) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === String(id)) {
                blogs.splice(i,1)
                return true;
            }
        }
        return false
    },
    deleteAllBlogs() {
        blogs.splice(0)
    }
}