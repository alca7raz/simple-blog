const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { server, storage } = require("./config.json");
const path = require('path');

const app = express();
const port = server.port || 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'assets')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'layouts'));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();
});

app.listen(port, () => { console.log("Listen on Port %d", port); });

require("leancloud-storage").init({
    appId: storage.appId,
    appKey: storage.appKey
});

const blog = require('./routes/blog.js');
const admin = require('./routes/admin.js');
const error = require('./routes/error.js');

app.use('/', blog);
app.use('/admin', admin);
app.use('/error', error);

module.exports = app;
