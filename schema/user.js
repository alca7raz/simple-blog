const StorageDriver = require("leancloud-storage");

module.exports = async function(login) {
    const query = new StorageDriver.Query("Users");
    query.equalTo("username", login.username);
    return await query.find().then((u) => {
        if (u.length == 0)
            throw true;
        else
            return u;
    }).then((u) => {
        if (u[0].get("password") == login.password)
            return true;
        else
            return false;
    }).catch(() => false);
};
