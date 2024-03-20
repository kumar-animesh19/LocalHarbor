const stripe = require("stripe");
const stripeGateway = stripe("sk_test_51OpUq4SAYvEZc85kdkzaix40KLBGIqNfVl4Qbs7DlXYaOrpNKfOOYrGwI5Dn709S5F6Zh0BWJWcBQXY8vQN1wdcv00JUkgzqBL");
const customer = require("../models/customer")

const payment = async (req, res) => {
  try {
    const lineitems = req.body.items.map((item) => {
      const unitAmount = parseInt(item.selling_price* 100);
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product_name,
          },
          unit_amount: unitAmount,
        },
        quantity: 1
      };
    });
    const session = await stripeGateway.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineitems,
      success_url: req.body.url+"/paymentSuccess.html",
      cancel_url: req.body.url+"/cart.html",
      billing_address_collection: "required",
      shipping_options: [
        { shipping_rate: "shr_1OpUuiSAYvEZc85kUkuefhOh" },
        { shipping_rate: "shr_1OpUvGSAYvEZc85kETSEK1IH" },
      ]
    });
    const data = await customer.findOne({_id : req.headers.user_id})
    await customer.updateOne({_id : req.headers.user_id}, {$push: {orders : data.cart}})
    await customer.updateOne({_id : req.headers.user_id},{$set: { cart: [] }})
    res.json(session.url);
  } 
  catch (error) {
    console.log(error);
  }
}

module.exports = payment;
