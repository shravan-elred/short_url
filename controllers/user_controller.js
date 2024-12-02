const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../service/auth_service')

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    User.create({
        name: name,
        email: email,
        password: password,
    });
    return res.render('home');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email: email,
        password: password,
    });
    if (!user) return res.render('login', {
        error: 'Invalid email or password',
    });
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect('/');
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
};