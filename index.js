const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const { log } = require("console");
var db = require(__dirname + "/db/connection.js");
var userschema = require(__dirname + "/db/userdb.js");
var Warehouse = require(__dirname + "/db/warehouse.js");
const passport = require("passport");
const session = require("express-session");
// const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// sessions
app.use(
  session({
    secret: "fly boy",
    resave: false,
    saveUninitialized: false,
    cookie: {
      //Expire Session after 1min.
      maxAge: 200000,
   }
}));

app.use(passport.initialize());
app.use(passport.session());

const uri = "mongodb://127.0.0.1:27017/wfpApp";

database().catch((err) => console.log(err));

async function database() {
  await mongoose.connect(uri);
  // await mongoose.connect('mongodb://127.0.0.1:27017/gitportalDB');
}

function appDb() {
  // userschema.plugin(uniqueValidator);
  const Admindb = mongoose.model("User", userschema);
  passport.use(Admindb.createStrategy());
  passport.serializeUser(Admindb.serializeUser());
  passport.deserializeUser(function (id, cb) {
    console.log("deserializing user owo:" + JSON.stringify(id))
    Admindb.findOne({id:id}).then((result)=>{
      if (!result) { return cb("error")}
        return cb(null, result);
    }).catch((err)=>{
      console.log(err);
    })
})

    return Admindb;
}

const User = appDb();

app.get("/login", (req, res) => {
  res.render("Auth/login");
});

app.post("/login", (req, res) => {
  
  const userlogin = new User ({username:req.body.username,
    password:req.body.password});
    
    
    // console.log(userlogin);
    req.login(userlogin, function(err){
      if (!err) {
        passport.authenticate("local", {
          failureRedirect: '/inbound',
          failureMessage: true
        })(req, res, function () {
          res.redirect("/auth");
        });
      } else {
        console.log(err);
      }

    })

  



});



// GET LANDING PAGE
app.get("/landing", (req, res) => {
  if(req.isAuthenticated()){
    res.render("bounds/landing", {data:req.user});
  }else{
    res.redirect("/login");
  }
});

// GET REPORTS
app.get("/report", (req, res) => {
  res.render("bounds/report");
});
app.get("/submit", (req, res) => {
  res.render("bounds/formComplete");
});
// TESTING ROUTES
app.get("/catch", (req, res) => {
  res.redirect("/addUser");
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



app.post("/inbound", (req, res) => {
  res.redirect("/submit");
});

app.get("/auth", (req, res) => {
  // res.render("Auth/auth");
  console.log("new route");
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.render("Auth/auth");
  } else {
    res.redirect("login");
  }
});
app.post("/auth", (req, res) => {
  console.log(req.body.authcode);
  res.redirect("/landing");
});

app.get("/modal", (req, res) => {
  res.render("index");
})



module.exports = {
    mainapp:app,
    userdb:appDb(),
    auth:passport,

}


