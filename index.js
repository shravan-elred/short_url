const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const urlRouter = require("./routes/url_router");
const homeRouter = require("./routes/home_router");
const userRouter = require("./routes/user_router");
const { connectToMonogoDb } = require("./connection");
const URL = require("./models/url");

const app = express();
const PORT = 3001;

connectToMonogoDb('mongodb://127.0.0.1:27017/short-url');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', homeRouter);
app.use('/url', urlRouter);
app.use('/user', userRouter);

app.get('/test', (req, res) => {
    URL.find({}).then((result) => {
        return res.render('home', { urls: result });
    });
});

app.listen(PORT, () => {
    console.log(`Server app running on http://localhost:${PORT}`);
});