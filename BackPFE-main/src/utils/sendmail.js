const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
});
module.exports =  function sendmail (mailOptions){
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log("[ERROR WHILE SENDING MAIL !]", error); else console.log("[MAIL SUCCESSFULLY SENT !]", info.response);
    });
}

