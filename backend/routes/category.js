var express=require('express')
const upload = require('./multer')
var router=express.Router()
var pool=require('./pool')
router.post('/add_new_category',upload.single('icon'),function(req,res){
    console.log(req.body)
    console.log(req.file)
    pool.query('insert into category ( companyid, category, description, icon, createdat, updateat, createdby) values (?,?,?,?,?,?,?)',[req.body.companyid,req.body.category,req.body.description,req.file.originalname,req.body.createdat,req.body.updateat,req.body.createdby],function(error,resulgt){
        if(error){
            console.log(error)
            res.status(500).json({status:false,message:'Server Error'})
        }
        else{
           res.status(200).json({status:true,message:'Category Added Succesfully'})
        }
    })
})
router.post('/fetch_all_category',function(req,res){
   
   
    pool.query("select C.*,(select CO.companyname from company CO where CO.companyid=C.companyid)as companyname from category C where C.companyid=?",[req.body.companyid],function(error,result){
        if(error){
            console.log(error)
           res.status(500).json({status:false,message:'Server Error'})
        }
        else{
            
         res.status(200).json({status:true,data:result})
        }
    })
})

router.post("/edit_category_data", function (req, res) {
    console.log(req.body);
    pool.query(
      "update category set companyid=?, category=?,description=?, createdat=?, updateat=?, createdby=? where categoryid=?",
      [
        req.body.companyid,
        req.body.category,
        req.body.description,
        req.body.createdat,
        req.body.updateat,
        req.body.createdby,
        req.body.categoryid,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({ status: false, message: "server error" });
        } else {
          res.status(200).json({ status: true, message: "category Edited succesfully" });
        }
      }
    );
  })

  router.post('/delete_category_data',function(req,res){
    pool.query("delete from category where categoryid=?",[req.body.categoryid],function(error,result){
      if(error){
        console.log(error);
        res.status(200).json({ status: false, message: "server error" });
  
      }
      else{
        res.status(200).json({ status: true, message: "category Deleted Succesfully" });
      }
    })
    
  })

  router.post('/edit_category_image',upload.single('icon'),function(req,res){
    pool.query("update category set icon=? where categoryid=?",[req.file.originalname,req.body.categoryid],function(error,result){
      if(error){
        console.log(error);
        res.status(200).json({ status: false, message: "server error" });
  
      }
      else{
        res.status(200).json({ status: true, message: "Image Updated" });
      }
    })
    
  })

module.exports=router