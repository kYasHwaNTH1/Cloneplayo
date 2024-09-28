const { time } = require('console');
const mongoose=require('mongoose');
const { required } = require('nodemon/lib/config');
const Schema=mongoose.Schema;
const objectId=mongoose.Types.objectId

const UserSchema=new Schema({
    username:String,
    email:{type:String,unique:true},
    password:String,
    phonenumber:{type:String,default:""}
})

const GameSchema=new Schema({
      userid:objectId,
      game:String,
      startDate:Date,
      startTimings:String,
      endTimings:String,
      isCreated:Boolean,
      location:Object,
      venue:{type:String,default:""}
})

const UserModel=mongoose.model('users',UserSchema)
const GameModel=mongoose.model('games',GameSchema)

module.exports={UserModel,GameModel}