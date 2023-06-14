const myExpress2 = require("../index.js");

const app = myExpress2.mainapp;
const User = myExpress2.userdb;



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
    await User.create({firstname:req.body.fname,
         lastname:req.body.lname, 
    email:req.body.email,
  password:"abcde12345",
  phone:"",
  active: true,
  position:req.body.position,
  profile_pic:"img/user_pro/demo.jpg",
  auth:"0000",
  admin:isAdmin,
}).then((result) =>{
    res.send(result);
  }).catch((err) =>{
    res.send({ kq: 0, msg: err });
  })
  });

// app.get("/super", function(req, res){
//     console.log("getting here");
// res.render("Auth/login")
// })


