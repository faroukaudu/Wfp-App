const myExpress2 = require("../index.js");

const app = myExpress2.mainapp;


app.get("/super", function(req, res){
    console.log("getting here");
res.send("MAIN ADMIN PAGE");
})


