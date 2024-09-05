
const express = require('express');
const router = express.Router();

const{register} = require("../Controllers/SignUpController");


//posting data

router.post("/register",register);


module.exports = router;