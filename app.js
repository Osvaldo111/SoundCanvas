var createError = require("http-errors");
var express = require("express");
var path = require("path");
var app = express();
var morgan = require("morgan");
//Routes
const canvasData = require("./routes/rSendEmail");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "client/build")));
app.use(morgan("tiny")); //Log all the HTTP requests and responses

app.use("/api/sendCanvas", canvasData);
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port);
