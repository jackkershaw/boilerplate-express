let express = require("express");
let app = express();
console.log("hello world");
module.exports = app;

// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

app.get("/", function (req, res) {
  let absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});
