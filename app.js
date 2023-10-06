// const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
const ejs = require("ejs");
const myExpress = require("./index.js");
const app = myExpress.mainapp;
const superadmin = require(__dirname + "/admin/superadmin.js");
const bounds = require(__dirname + "/admin/in_outbounds.js");
const create_warehouse = require(__dirname + "/admin/create_warehouse.js");

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");

app.get("/landing", (req, res) => {
  res.render("bounds/landing");
});
app.get("/report", (req, res) => {
  res.render("bounds/report");
});
app.get("/submit", (req, res) => {
  res.render("bounds/formComplete");
});

app.get("/admin", (req, res) => {
  res.send("Admin Page");
});

console.log("success");
app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Successfully Connected");
});

module.exports = app;
