
const express = require('express');
const router = express.Router();

const{register,getAllUsers,getUserById,updateUser,deleteUser} = require("../Controllers/SignUpController");


//posting data
router.post("/register",register);
//route for fetching data all once
router.get("/users",getAllUsers);

//route for fetching data by userid
router.get("/user/:id",getUserById);
//route for updating data
router.put("/users/:id",updateUser);

//route for deleting 
router.delete("/users/:id",deleteUser);





module.exports = router;