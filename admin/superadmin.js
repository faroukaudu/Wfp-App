const myExpress2 = require("../index.js");

const app = myExpress2.mainapp;
const User = myExpress2.userdb;
const passport = myExpress2.auth;



app.get("/super", function(req, res){
    console.log("getting here");
res.send("MAIN ADMIN PAGE");
})

// const data = {username:"farouk", email:"meme@gmail.com", position:"Boss"}

app.get("/addUser", (req, res) => {
  // res.render("bounds/createUsers",{data:data});
    if(req.isAuthenticated()){
      res.render("bounds/createUsers",{data:req.user});
    }else{
      res.redirect("/login");
    }
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
      fullname:req.body.realname,
      email: req.body.username,
      phone: 8160278321,
      active: true,
      position: req.body.position,
      profile_pic: "img/user_pro/farouk.jpg",
      auth: "0000",
      admin: isAdmin
    }), "121212", function (err, user) {

      if (!err) {
        // Delay
        setTimeout(function() {
          res.redirect("landing");  
        }, 5000);
        
        // passport.authenticate("local", {
        //   failureRedirect: '/inbound',
        //   failureMessage: true
        // })(req, res, function () {
        //   res.redirect("/landing");
        // });
      } else {
        res.send(err);
        console.log(err);
      }

    })
  });




  





