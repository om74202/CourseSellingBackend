const {Router}=require("express");
const {User,Course}=require("../db/index");
const userMiddlewares=require("../middlewares/user");
const router=Router();
const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Types;

router.post("/signup",async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    await User.create({
        username:username,
        password:password
    })
            res.json({msg:"user created sucessfully"});
});





router.get('/courses', async (req,res)=>{
    const response=await Course.find({});
    res.json({
        courses:response
    })
});

router.post('/courses/:courseID',userMiddlewares,async (req,res)=>{
    const username=req.headers.username;
    const courseID=req.params.courseID;
    const courseObjectId = new ObjectId(courseID);
    await User.updateOne({username:username}
        ,{
            "$push":{
                purchasedCourses:courseID
            }
        });
    res.json({msg:"purchase completed"});
})

router.get('/purchasedCourses',userMiddlewares,async (req,res)=>{
    const user=await User.findOne({
        username:req.headers.username
    });
    console.log(user.purchasedCourses);
    const courses=await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    })
    res.json({
        courses:courses
    })
})
module.exports=router;