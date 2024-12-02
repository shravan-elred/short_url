const URL = require("../models/url");

async function handleGetHome(req, res) {
    const user = req.user;
    if (!user) return res.redirect('/login');
    console.log(user);
    URL.find({
        createdBy: user._id,
    })
        .then((result) => {
            return res.status(200).render('home', { data: result });
        })
        .catch((e) => {
            return res.status(400).send('Something went wrong!');
        });
}

async function handleSignUp(req, res) {
    return res.render('signup');
}

async function handleLogin(req, res) {
    return res.render('login');
}

module.exports = {
    handleGetHome,
    handleSignUp,
    handleLogin,
};