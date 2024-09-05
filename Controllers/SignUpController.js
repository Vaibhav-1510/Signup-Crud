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

module.exports = {register};