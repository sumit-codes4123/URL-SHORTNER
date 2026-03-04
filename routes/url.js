const express = require('express');
const {
    handleGenerateShortURL,
    handlegetanalytics,
    handleRedirect
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortURL);
router.get("/analytics/:shortId", handlegetanalytics);

// 🔥 THIS IS IMPORTANT
router.get("/:shortId", handleRedirect);

module.exports = router;