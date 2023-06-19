const mongoose = require("mongoose");
// var db = require(__dirname + "/connection.js");
mongoose.set('strictQuery', true);

// const uri = "mongodb+srv://fancy98com:E6eoFBqkfDsweSKB@cluster0.rom3xsn.mongodb.net/flyboy";
// const uri = "mongodb://127.0.0.1:27017/gitportalDB";
// async function database() {
//   await mongoose.connect(uri);
// }
//database().catch(err => console.log(err));


// TRANSPORTER SCHEMA
const transporterSchema = new mongoose.Schema({
    transporter_name:String,
    phone:String,
    truck_plate:String,
    driver_info:String,
  });


// INBOUND SCHEMA

const inboundSchema = new mongoose.Schema({
    batch_num: String,
    obd:String,
    warehouse:String,
    activity: String,
    transport:[transporterSchema],
    destination: [
        {from: String, to: String}
    ],
    commodity:String,
    unit_wieght:String,
    metri_Ton:String,
    input_officer:String,
    remark:String,
    date:String,
    qty:String,
    stacks: [],
});

// OUTBOUND SCHEMA

const outboundSchema = new mongoose.Schema({
    batch_num: String,
    obd:String,
    warehouse:String,
    transport:[transporterSchema],
    destination: [
        {from: String, to: String}
    ],
    commodity:String,
    unit_weight:String,
    metri_Ton:String,
    input_officer:String,
    remark:String,
    date:String,
    qty:String,
});

const warehouseSchema = new mongoose.Schema({
    warehouse_name:{
        type:String,
        required:true,
        unique:true,
    },
    officer_name:{
        type:String,
        required:true,
        unique:true,
    },
    inbound:[inboundSchema],
    outbound:[outboundSchema],
    date:String,
  
  
  },
  {timestamps: true}
  
  )



const Warehouse = mongoose.model("Warehouse",warehouseSchema);




module.exports = Warehouse;
