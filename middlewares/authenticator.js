const { verify } = require("../modules/authenticator");

module.exports = function(req, res, next) {
    const token = req.cookies.token;
    req.login = verify(token);
    if (req.login)
        next();
    else
        res.redirect("/admin/login");
};
