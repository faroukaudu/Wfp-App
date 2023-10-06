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
app.use(session({
  secret: 'fly boy',
  resave: false,
  saveUninitialized: false,
  cookie: { 
      //Expire Session after 1min.
      maxAge: 600000,
   }
}));

app.use(passport.initialize());
app.use(passport.session());


const uri = "mongodb://127.0.0.1:27017/wfpApp";

database().catch(err => console.log(err));


async function database() {
  await mongoose.connect(uri);
  // await mongoose.connect('mongodb://127.0.0.1:27017/gitportalDB');
}



function appDb(){
  // userschema.plugin(uniqueValidator);
  const Admindb = mongoose.model("User",userschema);
  passport.use(Admindb.createStrategy());

  passport.serializeUser(function(user, cb) {
    console.log("serializing user uwuss:" + JSON.stringify(user))
    process.nextTick(function() {
      console.log(user.id);
        return cb(null, user.id)
    })
})

passport.deserializeUser(function (id, cb) {
  console.log("trying to GET" + id);
    console.log("deserializing user owo:" + JSON.stringify(id))
    Admindb.findById({_id:id}).then((user)=>{
      console.log("GETTING");
      return cb(null, user);
    }).catch((err)=>{
      return cb(err);
    });   
});
   return Admindb;
}

const User = appDb();






app.get("/login", (req, res) => {
  res.render("Auth/login")
 
});;

app.post("/login", (req, res) => {
  console.log(req.body.username);
  
  const userlogin = new User ({username:req.body.username,
    password:req.body.password});
  
    req.login(userlogin, function(err){
      if (!err) {
        passport.authenticate("local", {
          failureRedirect: '/inbound',
          failureMessage: true
        })(req, res, function () {
          console.log(req.user);
          // res.redirect("/landing");
          User.findOne({email:req.body.username}).then((foundUser)=>{
            if(foundUser.admin ===true){
              res.redirect("/auth");
            }else{
              res.redirect("/welcome");
            }
          })
        });
      } else {
        console.log(err);
      }

    })

  



app.get("/landing", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("bounds/landing");
  } else {
    res.redirect("/login");
  }
});



// GET LANDING PAGE
app.get("/welcome", (req, res) => {
  if(req.isAuthenticated()){
    console.log(req.user);
    res.render("bounds/landing_page", {data:req.user});
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

// POST LANDING
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




app.get("/auth", (req,res)=>{
  // res.render("Auth/auth");
  console.log("new route");
  if(req.isAuthenticated()){
    console.log(req.user);
    res.render("Auth/auth");
  }else{
    res.redirect("login");
  }
})
app.post("/auth", (req, res) => {
  console.log(req.body.authcode);
  res.redirect("/welcome");
});


app.get("/modal", (req,res)=>{
  res.render("index");
})

app.post("/signout", (req,res)=>{
  req.logout(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/login");
    }
  })
  

});


// ANIMATION ROUTES
// ANIMATION ROUTES
// ANIMATION ROUTES

app.get('/process', (req,res)=>{
  res.render("animations/in_anima", {deci:"fail"});
});

app.get('/process_s', (req,res)=>{
  res.render("animations/in_anima", {deci:"success"});
});

app.get("/success", (req,res)=>{
  res.render("animations/success");
})

app.get("/fail", (req,res)=>{
  res.render("animations/fail");
})

app.post("/postme", (req,res)=>{
  var main = {name:"Farouk", age:32};

return main;
})


// app.get("/land2", (req,res)=>{
//   res.render("bounds/landing2")
// })



module.exports = {
    mainapp:app,
    userdb:appDb(),
    warehouseDB:Warehouse,
    auth:passport,

}
