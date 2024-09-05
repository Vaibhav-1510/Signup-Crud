
const express = require('express');
const router = express.Router();

const{register,getAllUsers} = require("../Controllers/SignUpController");


//posting data

router.post("/register",register);
router.get("/users",getAllUsers);


module.exports = router;