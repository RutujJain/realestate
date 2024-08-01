const mongoose=require('mongoose')
const RegsiData =new mongoose.Schema({
    urname:{
        type:String,
        requried:true
    },
    uremail:{
        type:String,
        requried:true
    },
    urpassword:{
        type:String,
        requried:true
    }
});
const Regi =mongoose.model('Regi',RegsiData)
module.exports=Regi;