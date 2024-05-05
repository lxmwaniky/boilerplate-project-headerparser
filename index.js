require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// whoami endpoint
app.get("/api/whoami", function (req, res) {
  res.json(whoami(req));
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

/**
 *
 * @typedef {Object} Whoami
 * @property {string} ipaddress - Client ip address
 * @property {string} language - Client languages
 * @property {string} software - Client browser and software
 *
 */
/**
 *
 * @param {*} headers  Express.js request object
 * @returns {Whoami}  Response with client header information
 */
function whoami(request) {
  const { headers, ip } = request;

  return {
    ipaddress: ip,
    language: headers["accept-language"],
    software: headers["user-agent"],
  };
}