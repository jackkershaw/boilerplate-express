let express = require("express");
let app = express();
module.exports = app;
require("dotenv").config();
let bodyParser = require("body-parser");

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
app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

// mount body parser

app.use(bodyParser.urlencoded({ extended: false }));

// get query parameter
app
  .route("/name")
  .get((req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    res.json({ name: firstName + " " + lastName });
  })
  // post it
  .post((req, res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({ name: firstName + " " + lastName });
  });
