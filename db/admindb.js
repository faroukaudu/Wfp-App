const mongoose = require("mongoose");
var db = require(__dirname + "/connection.js");
mongoose.set('strictQuery', true);

// const uri = "mongodb+srv://fancy98com:E6eoFBqkfDsweSKB@cluster0.rom3xsn.mongodb.net/flyboy";
const uri = "mongodb://127.0.0.1:27017/gitportalDB";
async function database() {
  await mongoose.connect(uri);
}
//database().catch(err => console.log(err));
const adminInfoSchema = new mongoose.Schema({
  firstname: String,
  lastname:String,
  email:{
    type:String,
    unique:true,
    required: true,
  },
  password:String,
  phone:Number,
  date:String,
  active:Boolean,
  postion:String,
  profile_pic:String,
  auth:String,

},
{timestamps: true}

)



module.exports = adminInfoSchema;
