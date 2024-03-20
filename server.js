const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const customerRouter = require("./routes/customerRoutes")
const dotenv = require("dotenv")
const sellerRouter = require("./routes/sellerRoutes")
const verificationRouter = require("./routes/verificationRoutes")
const paymentRouter = require("./routes/paymentRoutes")

dotenv.config();

app.use(express.json())

app.use(express.static(path.join(__dirname, 'src')));

app.use("/", customerRouter, sellerRouter, verificationRouter, paymentRouter);

app.get("/404",(req,res)=>{
    res.sendFile(path.join(__dirname, 'src', "404.html"))
})

app.use((req,res)=>{
    res.redirect("/404")
})

const PORT = process.env.PORT || 5500 

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running on http://localhost:${PORT}`)
      })
})
.catch((error)=>{
    console.log(error);
})
