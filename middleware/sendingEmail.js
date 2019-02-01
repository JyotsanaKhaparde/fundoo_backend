
const nodemailer = require('nodemailer');
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
exports.sendEMailFunction = (url) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "jyotsanakhaparde0597@gmail.com",//process.env.GMAIL_USER,
            pass: "AP0144##",
        },
    });
    const mailOptions = {
        from: 'jyotsanakhaparde0597@gmail.com', // sender address
        to: 'shwetabochare11@gmail.com', // list of receivers
        subject: 'Subject of your email', // Subject line
        text: url
    };
    /** Sends an email using the preselected transport object */
    transporter.sendMail(mailOptions, function (err, info) {
        //send error
        if (err)
            console.log(err)
        else
            //send message information
            console.log("28---sendingEmail.js---BE: ",info);
    });
}


