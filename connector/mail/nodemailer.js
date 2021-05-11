const nodemailer = require('nodemailer')
const config = require('../../config')

const mailer = (mailOptions) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.sender.user, // generated ethereal user
            pass: config.sender.pass, // generated ethereal password
        },
        tls : {
            rejectUnauthorized : false
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = mailer