var express = require("express");
var router = express.Router();
var cCanvas = require("../controller/cGetCanvasData");

/* GET users listing. */
router.post("/", cCanvas.getCanvasData);

module.exports = router;
