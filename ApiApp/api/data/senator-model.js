const mongoose = require("mongoose");
require("dotenv").config();
const personSchema= mongoose.Schema({
    firstname:String,
    lastname:String,
});
const senatorSchema= mongoose.Schema({
    leadership_title:{
        type:String,
        required:false,
    },
    person:personSchema,
    title:String,
    party:String,
    state:String,
    startdate:String,
    enddate:String,
    phone:String,
    role_type:String,
    description:String,

});
    

mongoose.model(process.env.DB_NAME,senatorSchema,process.env.SENATORS_COLL);