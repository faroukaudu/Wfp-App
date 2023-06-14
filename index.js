const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { log } = require("console");
var db = require(__dirname + "/db/connection.js");
var userschema = require(__dirname + "/db/userdb.js");
var adminschema = require(__dirname + "/db/userdb.js");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


const uri = "mongodb://127.0.0.1:27017/wfpApp";

database().catch(err => console.log(err));


async function database() {
  await mongoose.connect(uri);
  // await mongoose.connect('mongodb://127.0.0.1:27017/gitportalDB');
}



function appDb(){
  // userschema.plugin(uniqueValidator);
  const Admindb = mongoose.model("User",userschema);
    return Admindb;
}

const User = appDb();


app.get("/first_admin", async function(req, res){
  await User.create({firstname:"Farouk", lastname:"Audu", 
  email:"farouk.audu@goldparklogistics.com",
password:"countmeIn2023",
phone:08160278321,
active: true,
position:"Tech",
profile_pic:"img/user_pro/farouk.jpg",
auth:"0000",
admin:true}).then((result) =>{
  res.send(result);
}).catch((err) =>{
  res.send({ kq: 0, msg: err });
})
})







app.get("/inbound", (req, res) => {
  res.render("bounds/inboundForm");
});
app.get("/outbound", (req, res) => {
  res.render("bounds/outboundForm");
});

app.get("/login", (req, res) => {
  res.render("Auth/login");
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


// app.post("/auth", (req,res) =>{
//   User.find
// })

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
  User.findOne({email:req.body.email}).then((user) =>{
    if(user.password === req.body.password){
     if(user.admin == true){
      res.render("Auth/auth");
     }else{
      console.log("You are a normal User");
      res.render("bounds/landing");
     }
    }else{
      console.log("Incorrect password");
    }
  })
  



});

app.post("/inbound", (req, res) => {
  res.redirect("/submit");
});
app.post("/auth", (req, res) => {
  console.log(req.body.authcode);
  res.redirect("/landing");
});



module.exports = {
    mainapp:app,
    userdb:appDb(),

}