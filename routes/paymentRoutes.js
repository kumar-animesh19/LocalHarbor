const express = require("express")
const paymentRouter = express.Router();
const authCustomer =  require("../middleware/authCustomer");
const payment = require("../controllers/paymentController")


paymentRouter.post("/payment",authCustomer, payment)

module.exports = paymentRouter