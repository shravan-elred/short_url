const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ message: "URL is required" });
    }
    const shortId = nanoid(8);
    URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visits: [],
        createdBy: req.user,
    })
        .then((result) => {
            return res.status(201).render('home', { result: result });
        })
        .catch((e) => {
            return res.status(400).json(e);
        });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    URL.findOne({ shortId })
        .then((result) => {
            return res.status(200).json({
                totalVisits: result.visits.length,
                visits: result.visits,
            });
        }).catch((e) => {
            return res.status(400).json(e);
        });
}
async function handleShortURL(req, res) {
    const shortId = req.params.shortId;
    URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visits: {
                    timestamp: Date.now()
                }
            }
        },
        { returnDocument: 'after' }
    ).then((result) => {
        return res.redirect(result.redirectURL);
    }).catch((e) => {
        return res.status(400).json(e);
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleShortURL,
};