require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectdb = require('./Db/db');

app.use(express.json());
app.use(cors());

//database connection
connectdb();

//routes 
const RegisterRoutes = require("./Routes/RegisterRoutes");
const LoginRoutes = require("./Routes/LoginRoute");

app.use("/api",RegisterRoutes);
app.use("/api",LoginRoutes);




/*
app.get("/",(req,res)=>{
    res.send("Hello from Node AND MONGO");
})
*/
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("SERVER IS RUNNING ON PORT 8080");
})