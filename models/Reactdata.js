const mongoose =require('mongoose');
const Reactdata=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});
const User =mongoose.model('User',Reactdata);
module.exports=User;

