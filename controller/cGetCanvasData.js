var email = require("./cSendEmail");
getCanvasData = (req, res) => {
  const canvasURL = req.body.imgURL;
  email.sendEmail("Testing email", canvasURL);
  //   console.log("Get Canvas Data: ", req.body.imgURL);
  res.status(200).json({ results: "OK" });
};

module.exports = {
  getCanvasData: getCanvasData
};
