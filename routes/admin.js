const express=require("express");
const {Admin,Course}=require("../db/index");
const adminMiddlewares=require("../middlewares/admin");
const router=express.Router();

router.post("/signup",adminMiddlewares,(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    Admin.create({
        username:username,
        password:password
    })
    .then(function(){
         res.json({msg:"Admin created sucessfully"
         });
})
    
})


router.post("/courses",adminMiddlewares,(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const imgLink=req.body.imgLink;
    const price=req.body.price;

    const newCourses= Course.create({
        title:title,
        description:description,
        imgLink:imgLink,
        price:price
    })
    .then(function(){
        res.json({msg:"courses created sucessfully"});
    })
})



router.get('/courses',adminMiddlewares,(req,res)=>{
    Course.find({})
    .then(function(response){
        res.json({courses:response});
    })
})

module.exports=router;