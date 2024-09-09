const bcrypt = require('bcrypt');
const Login = require('../Modals/SignUp');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const login =async(req,res) =>{
    const{email,password,token:settoken} =req.body;
    try{
        const user =await Login.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid email or password..'});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:'Invalid email or password..'});

        }
        //Generate a new token with a 30 sex expiration time
        const token = jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:'30s'});

        //Validate the token if provided in body,params , or headers

        const tokenValidiate = settoken

        if(tokenValidiate){
            try{
                const decoded = jwt.verify(tokenValidiate,JWT_SECRET);
                return res.json({message:'Token is valid ',user:decoded});
            }catch(error){
                return res.status(400).json({message:'Invalid token..'});
            }
        }

        return res.json({token,message:'successfull'});
    }catch(error)
    {
            console.log('LOGIN ERROR..',error);
            res.status(500).json({message:'Something Wrong..'});
    }
}
 
module.exports ={login};
