const jwt = require("jsonwebtoken")
const seller = require("../models/seller")

const authSeller = async (req, res, next)=>{
    try {
        let token = req.headers.authorization
        if(token){
            let user = jwt.verify(token, process.env.SECRET_KEY)
            if(await seller.findOne({_id: user.id})){
                req.headers.user_id = user.id
                next()
            }
            else{
                res.send({Auth:"Decline User",Msg:"Unauthorised user!....."})
            }
        }
        else{
            res.send({Auth:"Decline User",Msg:"Unauthorised user!....."})
        }
    } catch (error) {
        res.send({Auth:"Decline User",Msg:"Unauthorised user!....."})
    }
}

module.exports = authSeller