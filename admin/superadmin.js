const myExpress2 = require("../index.js");

const app = myExpress2.mainapp;
const User = myExpress2.userdb;
const passport = myExpress2.auth;



app.get("/super", function(req, res){
    console.log("getting here");
res.send("MAIN ADMIN PAGE");
})


app.get("/addUser", (req, res) => {
    res.render("bounds/createUsers");
  });

//   post route
  app.post("/addUser", async (req, res) => {

    console.log(req.body.position);
    var isAdmin;
    if (req.body.position === "Manager"){
        isAdmin = true;
    }else{
        isAdmin = false;
    }

    User.register(new User({
      username: req.body.username,
      email:req.body.username,
      phone:08160278321,
      active: true,
      position:req.body.position,
      profile_pic:"img/user_pro/farouk.jpg",
      auth:"0000",
      admin:isAdmin

    }), req.body.password, function(err, user){

      if (!err) {
        passport.authenticate("local", {
          failureRedirect: '/landing',
          failureMessage: true
        })(req, res, function () {
          res.redirect("/login");
        });
      } else {
        console.log(err);
      }

    })
  });





