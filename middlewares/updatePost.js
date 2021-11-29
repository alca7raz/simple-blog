const StorageDriver = require("leancloud-storage");

module.exports = async function(req, res, next) {
    if (req.body.id == 0)
        post = new StorageDriver.Object("Articles");
    else
        post = StorageDriver.Object.createWithoutData("Articles", req.body.id);
    post.set("title", req.body.title);
    post.set("author", req.body.author);
    post.set("content", req.body.content);
    post.set("description", req.body.description);
    post.set("category", req.body.category);
    post.save().then(() => next());
}