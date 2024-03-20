var nodemailer = require('nodemailer');

const  sendOTP = (req,res) => { 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'localharbor69@gmail.com',
          pass: 'akje wycj gcrj ewuw'
        }
    });
      
    var mailOptions = {
        from: '"LocalHarbor" localharbor69@gmail.com',
        to: req.body.email,
        subject: 'OTP',
        text: "Verification code "+req.body.otp
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.send({Auth: "Success"})
        }
    });
}

module.exports = sendOTP