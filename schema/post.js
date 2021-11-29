const StorageDriver = require("leancloud-storage");

async function deletePost(pid) {
    const post = StorageDriver.Object.createWithoutData("Articles", pid);
    await post.destroy();
}

async function showPosts() {
    const query = new StorageDriver.Query("Articles");
    return await query.find().then((p) => {
        if (p.length == 0)
            throw true;
        else
            return p;
    }).then((p) => {
        let posts = [];
        for (let pp of p) {
            posts.push({
                id: pp.getObjectId(),
                title: pp.get("title"),
                author: pp.get("author"),
                description: pp.get("description"),
                category: pp.get("category"),
                tags: pp.get("tags"),
                date: pp.updatedAt.toDateString()
            });
        }
        return posts;
    }).catch(() => false);
}

module.exports = {
    deletePost,
    showPosts
};
