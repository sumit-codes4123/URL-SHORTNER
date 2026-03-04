const shortid=require("shortid");
const URL=require('../models/url');
async function handleGenerateShortURL(req,res){
    const body=req.body;
    if(!body.url)return res.status(400).json({ error:'url is required'});
    const shortID=shortid.generate();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],

    });
    const allUrls = await URL.find({});

    return res.redirect("/");
}
async function handlegetanalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalclicks:result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
async function handleRedirect(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { returnDocument:"after" }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
}
module.exports={
    handleGenerateShortURL,
    handlegetanalytics,
    handleRedirect,
}