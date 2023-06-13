const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
const ejs = require("ejs");

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

app.get("/addUser", (req, res) => {
  res.render("bounds/createUsers");
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

app.listen(process.env.PORT || 3000, () => {
  console.log("Successfully Connected");
});
