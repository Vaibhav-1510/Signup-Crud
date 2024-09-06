const Register = require("../Modals/SignUp");
const bcrypt = require("bcrypt");

const register = async(req,res)=>{

    const{name,email,password,mobile,address} = req.body;

    try{
        const emailDuplicate = await Register.findOne({email});

        if(emailDuplicate){
            return res.status(400).json({message:"This Email Already Existed... "})

        }
        if(password.length < 8){
            return res.status(400).json({message:"Password Too Short MIN 8 Chars required..."})
        }
        if(name.length < 2){
            return res.status(400).json({message:"Name Too Short...."});
        }
        if(mobile.length < 10){
            return res.status(400).json({message:"mobile format small..."});
        }
        if(mobile.length > 10){
            return res.status(400).json({message:"MOBILE FORMAT WRONG...."})
        }
       
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newRegister = new Register({email,password:hashedPassword,name,mobile,address});
        await newRegister.save();

        //Hash the password before
        res.status(200).json({message:"User SignUp Successfull..."})
        
    }catch(error)
    {
            console.error("REgister Error:",error);
            res.status(500).json({message:"Error While Register..."})
    }
};

/*Fetching data from data base*/
    const getAllUsers = async(req,res) =>{
        try{
            const users = await Register.find();
            res.status(200).json(users);
        }
        catch(error){
            res.status(500).json({message:"Something is error...",error})
        }
    }

    /** fetching data by userid */
    const getUserById = async(req,res) =>{
        const {id} = req.params;
        try{
            const user = await Register.findById(id);
            if(!user){
                return res.status(404).json({message:'User not found'});
            }

            res.status(200).json(user);

        }
        catch(error){
            res.status(500).json({message:'Internal Error',error});
            console.log(error);
        }
    }

    /** Updating user */

    const updateUser = async(req,res) =>{
        const {id} = req.params;
        const{email,name,address,mobile} =req.body;

        try{
            const userUpdate = await Register.findByIdAndUpdate(id,{email,name,address,mobile},{new:true});
            if(!userUpdate){
                return res.status(404).json({message:"User not found"});
            }
            res.status(200).json({message:'User updated successfully',user:userUpdate});

        }
        catch(error){
                res.status(500).json({message:'Internal Server error...'})
        }
    }

    /**Deleting user */
    const deleteUser = async(req,res) =>{
        const {id} = req.params;
        try{
            const deleteUser = await Register.findByIdAndDelete(id);
            if(!deleteUser){
                return res.status(404).json({message:'Not found'})
            }
            res.status(200).json({message:'User deleted successfully..'});
        }
        catch(error){
            res.status(500).json({message:'Internal server Error..'})
        }
    }
    

module.exports = {register,getAllUsers,getUserById,updateUser,deleteUser};
