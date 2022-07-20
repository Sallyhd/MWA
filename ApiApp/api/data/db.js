
const mongoose = require("mongoose");
require("dotenv").config();
require("./senator-model");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on(process.env.CONNECTED,function(){
    console.log(process.env.MONGOOSE_CONNECTED);
});
mongoose.connection.on(process.env.DISCONNECTED,function(){
    console.log(process.env.MONGOOSE_DISCONNECTED);
});
mongoose.connection.on(process.env.ERROR,function(){
    console.log(process.env.MONGOOSE_ERROR);
});
process.on(process.env.SIGINT,function(){
    mongoose.connection.close();
    process.exit(0);
});
process.on(process.env.SIGTERM,function(){
    mongoose.connection.close();
    process.exit(0);
});