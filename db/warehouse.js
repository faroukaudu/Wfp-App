const mongoose = require("mongoose");
// var db = require(__dirname + "/connection.js");
mongoose.set('strictQuery', true);

// const uri = "mongodb+srv://fancy98com:E6eoFBqkfDsweSKB@cluster0.rom3xsn.mongodb.net/flyboy";
// const uri = "mongodb://127.0.0.1:27017/gitportalDB";
// async function database() {
//   await mongoose.connect(uri);
// }
//database().catch(err => console.log(err));
const warehouseSchema = new mongoose.Schema({
  warehouse_name:String,
  officer_name:String,
  inbound:[inboundSchema],
  outbound:[outboundSchema],
  date:String,


},
{timestamps: true}

)

// INBOUND SCHEMA

const inboundSchema = new mongoose.Schema({
    batch_num: Number,
    obd:String,
    warehouse:String,
    activity: String,
    transport:[],
    destination: [
        {from: String, to: String}
    ],
    commodity:String,
    unit_wieght:String,
    Metri_Ton:String,
    input_officer:String,
    remark:String,
    date:String,
    stacks: [],
});

// OUTBOUND SCHEMA

const outboundSchema = new mongoose.Schema({
    batch_num: Number,
    obd:String,
    warehouse:String,
    transport:[],
    destination: [
        {from: String, to: String}
    ],
    commodity:String,
    unit_wieght:String,
    Metri_Ton:String,
    input_officer:String,
    remark:String,
    date:String,
});




module.exports = adminInfoSchema;
