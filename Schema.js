const { time } = require('console');
const mongoose=require('mongoose');
const { required } = require('nodemon/lib/config');
const Schema=mongoose.Schema;
const objectId=mongoose.Types.ObjectId

const UserSchema=new Schema({
    username:{type:String,required:true},
    email:{type:String,unique:true},
    password:{type:String,required:true},
    phonenumber:{type:String,default:""}
})

const GameSchema=new Schema({
      userid:{type:String,required:true},
      game:{type:String,required:true},
      startDate:{type:String,required:true},
      startTimings:{type:String,required:true},
      endTimings:{type:String,required:true},
      isCreated:{type:String,required:true},
      location:{type:String,required:true},
      venue:{type:String,default:""}
})

const UserModel=mongoose.model('users',UserSchema)
const GameModel=mongoose.model('games',GameSchema)

module.exports={UserModel,GameModel}