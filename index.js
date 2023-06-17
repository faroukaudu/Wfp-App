const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");
var db = require(__dirname + "/db/connection.js");
var db = require(__dirname + "/db/userdb.js");

const uri = "mongodb://127.0.0.1:27017/wfpApp";

database().catch((err) => console.log(err));

async function database() {
  await mongoose.connect(uri);
  // await mongoose.connect('mongodb://127.0.0.1:27017/gitportalDB');
}

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/inbound", (req, res) => {
  res.render("bounds/inboundForm");
});
app.get("/outbound", (req, res) => {
  res.render("bounds/outboundForm");
});

app.get("/login", (req, res) => {
  res.render("Auth/login");
});

// app.get("/logins", (req, res) => {
//   res.render("Auth/login-13");

// });

app.get("/", function (req, res) {
  res.render("auth/login");
});

app.get("/landing", (req, res) => {
  res.render("bounds/landing");
});
app.get("/report", (req, res) => {
  res.render("bounds/report");
});
app.get("/submit", (req, res) => {
  res.render("bounds/formComplete");
});

app.get("/auth", (req, res) => {
  res.render("Auth/auth");
});

app.post("/landing", (req, res) => {
  const operations = req.body.operation;
  console.log(operations);
  if (operations === "inbound") {
    res.redirect("/inbound");
  } else if (operations === "outbound") {
    res.redirect("/outbound");
  } else if (operations === "report") {
    res.redirect("/report");
  }
});

app.post("/login", (req, res) => {
  console.log(req.body.email, req.body.password);
  res.redirect("/auth");
});

app.post("/inbound", (req, res) => {
  res.redirect("/submit");
});
app.post("/auth", (req, res) => {
  console.log(req.body.authcode);
  res.redirect("/landing");
});

module.exports = {
  mainapp: app,
};
