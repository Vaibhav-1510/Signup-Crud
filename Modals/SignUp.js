const mongoose = require('mongoose');

//Schema means fields to store in object
const schema = mongoose.Schema;

const RegisterSchema = new schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required :true
    },
    password:{

        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true

    }

});



const Register = mongoose.model('RegisterUsers',RegisterSchema);

module.exports = Register;