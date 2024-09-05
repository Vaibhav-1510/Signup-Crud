const mongoose = require('mongoose');

const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,

        }
    );
    console.log("CONNECTED TO MONGODB SUCCESSFULLY...");
    }
    catch(error){
        console.log("Error connecting database...",error);
    }

};

module.exports=connectdb;