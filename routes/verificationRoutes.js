const express = require("express")
const verificationRouter = express.Router();
const sendOtp = require("../controllers/verificationController")


verificationRouter.post("/verifyEmail", sendOtp)

module.exports = verificationRouter