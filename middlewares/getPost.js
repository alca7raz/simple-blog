const StorageDriver = require("leancloud-storage");

module.exports = function(req, res, next) {
    const query = new StorageDriver.Query("Articles");
    query.get(req.params.id).then((a) => {
        if (a.get('content') == undefined)
            throw true;
        else
            return a;
    }).then((a) => {
        req.article = {
            title: a.get('title'),
            content: a.get('content'),
            category: a.get("category"),
            description: a.get("description"),
            author: a.get("author"),
            tags: a.get("tags"),
            date: a.updatedAt.toDateString()
        };
        next();
    }).catch(() => res.redirect("/error/404"));
}