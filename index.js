const express=require('express');
const path=require('path');
const {connectMongoDB}=require('./connect');
const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const URL=require('./models/url');
const app=express();

const PORT=8001;

connectMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log('mongodb connected'));

app.set('view engine','ejs');
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url",urlRoute);
app.use("/",staticRoute);
app.get("/delete-all", async (req, res) => {
    await URL.deleteMany({});
    res.send("All data deleted");
});
app.listen(PORT,()=>{
    console.log(`server started at PORT: ${PORT}`)
});