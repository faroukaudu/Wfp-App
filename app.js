// const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
const ejs = require("ejs");
const myExpress = require("./index.js");
const app = myExpress.mainapp;
const superadmin = require(__dirname + "/admin/superadmin.js");




<<<<<<< HEAD
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
=======
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
>>>>>>> 8bf55f1d0c99d3332c3f5937f2f328e71c271a80


app.get("/admin", (req,res) =>{
  res.send("Admin Page");
})



app.listen(process.env.PORT || 3000, (req,res) => {
  console.log("Successfully Connected");
});


module.exports = app;
