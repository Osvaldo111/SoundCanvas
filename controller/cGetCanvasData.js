var email = require("./cSendEmail");
var mEmail = require("../model/mInsertEmails");
getCanvasData = (req, res) => {
  const userEmail = req.body.data.email;
  const canvasURL = req.body.data.imgURL;
  const message = "Here is your design";
  mEmail.queryInsertEmails("sendcanvas", userEmail, (err, results) => {
    if (err) {
      res.status(500).json({ res: "Server Error" });
      console.log(err);
    } else {
      email.sendEmail(message, userEmail, canvasURL, (err, results) => {
        if (err) {
          console.log("Email Error: ", err);
          res
            .status(200)
            .json({ res: "Verify your email or contact the support team" });
        } else {
          console.log("Email Results: ", results);
          res.status(200).json({ res: "Email Sent" });
        }
      });
    }
  });
};

module.exports = {
  getCanvasData: getCanvasData
};
