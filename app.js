// const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
const ejs = require("ejs");
const myExpress = require("./index.js");
const app = myExpress.mainapp;
const superadmin = require(__dirname + "/admin/superadmin.js");




// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");


app.get("/admin", (req,res) =>{
  res.send("Admin Page");
})



app.listen(process.env.PORT || 3000, (req,res) => {
  console.log("Successfully Connected");
});


module.exports = app;
