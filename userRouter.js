const {Router}=require('express')
const Middleware=require('./auth')
const userRouter=Router()
const {UserModel,GameModel}=require('./Schema')
const jwt=require('jsonwebtoken')
const passkey=process.env.USERPASSKEY
const cheking=require('./Validation/cheking')

userRouter.post('/signup',async(req,res)=>{
      const username=req.body.username
      const email=req.body.email;
      const password=req.body.password;
      const phonenumber=req.body.phonenumber;
      const validation = cheking.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid format",
          errors: validation.error.errors.map((err) => err.message), // Return detailed errors
        });
      }

      try{
      await UserModel.create({
        username,
        email,
        password,
        phonenumber
      })
      res.json({msg:"Suuccessfully signed up"})
    }catch(err){
        return res.json({msg:err.message})
    }
})

userRouter.post('/signin',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    try{
        const user=await UserModel.findOne({email:email})
        console.log(user)
        if(!user){
            return res.json({msg:"No user found with the email"})
        }
       if(user.password!==password){
        return res.json({msg:"Incorrect Credentials"})
       }
       const token=jwt.sign({id:user._id},passkey)

       return res.json({
        msg:"Login successful",
        token:token
       })
    }
    catch(err){
        return res.json({msg:err.message,
            "e":"from catch block"
        })
    }
})

userRouter.use(Middleware   )

userRouter.put('/updatedata',async(req,res)=>{
    const id=req.id;
    const phonenumber=req.body.phonenumber;
    const password=req.body.password;
    const username=req.body.username;
          await UserModel.updateOne({_id:id},
        {username,password,phonenumber}
    )
    return res.send("Updated data successfully");
})


userRouter.post('/newgame',async(req,res)=>{
    const id=req.id;
    const game=req.body.game;
    const startDate=new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const startTimings=req.body.startTimings;
    const endTimings=req.body.endTimings;
    const location=req.body.location;
    const venue=req.body.venue;
    const isCreated=true;

 try{
    await GameModel.create({
        userid:id,
        game,
        startDate,
        startTimings,
        endTimings,
        isCreated,
        location,
        venue
    })
    res.json({msg:"Game created successfully"})
 }
 catch(err){
     return res.json({msg:err.message})
 }

})



userRouter.get('/sports',async(req,res)=>{
    //this route is responsible for getting the games data based on the chosen games and location
    const game=req.body.game;
    const location=req.body.location;
    const venue=req.body.venue;
    const time=req.body.time;
    const isCreated=req.body.isCreated;
    try{

    const games=await GameModel.find({game,location,venue,time})
    res.json({games:games})
    }
    catch(err){
        return res.json({msg:err.message})
    }
})

userRouter.get('/owngames',async(req,res)=>{
    //This route is responsible for getting the user posted games and not others
    const id=req.id;
    try{
        const games=await GameModel.find({userid:id,isCreated:true})
        res.json({games:games})
    }
    catch(err){
        return res.json({msg:err.message})
    }
})




module.exports={userRouter}