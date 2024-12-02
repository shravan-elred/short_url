const express = require("express");
const { checkAuth } = require('../middleware/auth_middleware');
const {
    handleGetHome,
    handleSignUp,
    handleLogin,
} = require("../controllers/home_controller");

const router = express.Router();

router.use(checkAuth);

router.get('/', handleGetHome);
router.get('/signup', handleSignUp);
router.get('/login', handleLogin);

module.exports = router;