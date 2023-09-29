var express=require('express')
var router=express.Router()
var pool= require('./pool')
router.get('/fetch_all_states',function(req,res,next){
    pool.query("select * from state ",function(error,result){
        if(error){
           res.status(500).json({status:false,message:'Server Error'})
        }
        else{
            res.status(200).json({status:true,data:result})
        }
    })
})
router.post('/fetch_all_cities',function(req,res,next){
    pool.query("select * from city where stateid=? ",[req.body.stateid],function(error,result){
        if(error){
           res.status(500).json({status:false,message:'Server Error'})
        }
        else{
            res.status(200).json({status:true,data:result})
        }
    })
})

module.exports=router;