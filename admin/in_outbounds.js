const myExpress2 = require("../index.js");

const app = myExpress2.mainapp;
const User = myExpress2.userdb;
const passport = myExpress2.auth;
const Warehouse = myExpress2.warehouseDB;


// GET INBOUNDS
app.get("/inbound", (req, res) => {
    if(req.isAuthenticated()){
      res.render("bounds/inboundForm", {data:req.user});
    }else{
      res.redirect("/login");
    }
  });
  // POST INBOUNDS
app.post("/inbound", async (req, res) => {
  // batchno,date,warehouse(using to findDB),obd,commodity,kg,qty,mt,
  // activity,from,to,transporter,t-phone,t-plate-no,
  // driver-c,remark,
  // console.log(req.body.warehouse);
  const inbound_item =  {
    batch_num:req.body.batchno,
    date:req.body.date,
    obd:req.body.obd,
    commodity:req.body.commodity,
    unit_weight:req.body.kg,
    qty:req.body.qty,
    metri_Ton:req.body.mt,
    activity:req.body.activity,
    transport:[
      {transporter_name:req.body.transporter,
        phone:req.body.t_phone,
        truck_plate:req.body.t_plate_no,
        driver_info:req.body.driver_c,}
    ],
    // from:req.body.from,
    // to:req.body.to,
    remark:req.body.remark,
  };
  // console.log(inbound_item);

  const transportInfo = {
    transporter_name:req.body.transporter,
    phone:req.body.t_phone,
    truck_plate:req.body.t_plate_no,
    driver_info:req.body.driver_c,

  };


  await Warehouse.findOne({warehouse_name:req.body.warehouse}).then((house)=>{
    var path = house.inbound;
    console.log(house.officer_name);
 
    // res.send(house);
    path.push(inbound_item);
    house.save();
    // path.transport.push(transportInfo);
    // house.save();
    // res.send(house);
  }).catch((err)=>{
    res.send(err)
  })

  // res.redirect("/submit");
});

  // GET OUTBOUNDS
  app.get("/outbound", (req, res) => {
    res.render("bounds/outboundForm");
  });
