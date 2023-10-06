const myExpress2 = require("../index.js");

const app = myExpress2.mainapp;
const User = myExpress2.userdb;
const passport = myExpress2.auth;
const Warehouse = myExpress2.warehouseDB;



app.get("/addstore" , async (req,res)=>{
    if(req.isAuthenticated()){
      await User.find().then((allUser)=>{
        res.render("bounds/addwarehouse", 
        {data:req.user, users:allUser});
      }).catch((err)=>{
        console.log(err);
      })
      
    }else{
      res.redirect("/login");
    }
  });


  app.post("/addstore", async (req,res)=>{
    console.log(req.body.warehouse_name);
    console.log(req.body.warehouse_off);

    await Warehouse.create({
        warehouse_name: req.body.warehouse_name,
        officer_name:req.body.warehouse_off,
    }).then((house)=>{
        res.send(house);
    }).catch((err)=>{
        res.send(err);
    })



  })