// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// var userschema = require("../db/userdb.js");
// const passport = require("passport");
// const session = require("express-session");
// // const myExpress2 = require("../index.js");

// const uri = "mongodb://127.0.0.1:27017/wfpApp";

// database().catch(err => console.log(err));


// async function database() {
//   await mongoose.connect(uri);
//   // await mongoose.connect('mongodb://127.0.0.1:27017/gitportalDB');
// }




// const app = express();
// app.use(express.json());
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");

// // const app = myExpress2.mainapp;



// // sessions
// app.use(session({
//     secret: 'fly boy',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { 
//         //Expire Session after 1min.
//         maxAge: 600000,
//      }
//   }));
  
//   app.use(passport.initialize());
//   app.use(passport.session());


//   function appDb(){
//     // userschema.plugin(uniqueValidator);
//     const Admindb = mongoose.model("User",userschema);
//     passport.use(Admindb.createStrategy());
  
//     passport.serializeUser(function(user, cb) {
//       console.log("serializing user uwuss:" + JSON.stringify(user))
//       process.nextTick(function() {
//         console.log(user.id);
//           return cb(null, user.id)
//       })
//   })
  
//   passport.deserializeUser(function (id, cb) {
//     console.log("trying to GET" + id);
//       console.log("deserializing user owo:" + JSON.stringify(id))
//       Admindb.findById({_id:id}).then((user)=>{
//         console.log("GETTING");
//         return cb(null, user);
//       }).catch((err)=>{
//         return cb(err);
//       });
          
          
      
//   });
  
  
//       return Admindb;
//   }


//   module.exports = {passportApp:app, passportDB:appDb() }