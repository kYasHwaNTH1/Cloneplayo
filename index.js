const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const mongoose=require('mongoose')
const axios=require('axios')
const {userRouter}=require('./userRouter')

app.use(express.json())
app.use(cors())

app.use('/api',userRouter);

function main(){
    mongoose.connect(process.env.MONGODBURL)
    .then(()=>{
        console.log("Connected to database")
    })
    app.listen(process.env.PORT,()=>{
        console.log(`server running at port ${process.env.PORT}`)
    })
}
main()