let express = require("express");
let app = express();
module.exports = app;
require("dotenv").config();

// middleware function - logging service

app.use(function (req, res, next) {
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

// send text response

// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

// file response

app.get("/", function (req, res) {
  let absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

//json response

app.use("/public", express.static(__dirname + "/public"));
app.use("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

// chaining middleware

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

// echo server
