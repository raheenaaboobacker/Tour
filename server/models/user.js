const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:false},
    googleId:{type:String,required:false},
    id:{type:String},
})
// var registerdata=mongoose.model('User',userSchema);
module.exports=mongoose.model('User',userSchema);
// export default mongoose.model("User",userSchema);
