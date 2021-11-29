const jwt = require("jsonwebtoken");
const { privateKey } = require("../config.json");

function verify(token) {
    if (!token)
        return false;
    try {
        const raw = jwt.verify(token, privateKey);
        return raw;
    } catch (ex) {
        return false;
    }
}

function sign(payload) {
    return jwt.sign(payload, privateKey);
}

module.exports = {
    verify,
    sign
};
