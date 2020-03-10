var nodemailer = require("nodemailer");
const userCred = require("../emailCredentials/credentials");

const sendEmail = (message, userEmail, file, callback) => {
  //   console.log("NodeMailer", userCred.email, userCred.password);
  //   console.log("The image: ", file);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userCred.email,
      pass: userCred.password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: userCred.email,
    to: userEmail,
    subject: "Floppyer Job!",
    text: JSON.stringify(message),
    attachments: [
      {
        filename: "image.png",
        /*Remove the data type to sent the img as png */
        content: file.split("base64,")[1],
        encoding: "base64"
      }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      // console.log(error);
      callback(error, null);
    } else {
      callback(null, "Email sent: " + info.response);
      // console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendEmail: sendEmail
};
