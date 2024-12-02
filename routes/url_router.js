const express = require("express");
const {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleShortURL,
} = require("../controllers/url_controller");
const { restrictToLoggedInUserOnly } = require('../middleware/auth_middleware');


const router = express.Router();

router.use(restrictToLoggedInUserOnly);

router.post('/', handleGenerateNewShortURL);
router.get('/:shortId/analytics', handleGetAnalytics);
router.get('/:shortId', handleShortURL)

module.exports = router;