const express = require("express");
require("./api/data/db");
require("dotenv").config();
const route = require("./api/route");

const app = express();

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Methods","PUT,GET,DELETE,POST");
    res.header("Access-Control-Allow-Headers","Content-Type,Accept");
    next();
})
app.use(process.env.API_ROUTE,route);


const server = app.listen(process.env.PORT,function(){
    const port = server.address().port;
    console.log(process.env.SERVER_RUN_MSG,port);
})