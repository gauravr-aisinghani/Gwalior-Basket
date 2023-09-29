var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
router.post("/fetch_all_categories", function (req, res) {
   
    pool.query(
      "select * from category where companyid=?",[req.body.companyid],
     
      
      function (error, result) {
        console.log(result);
        if (error) {
          console.log(error);
          res.status(500).json({ status: false, message: "Server Error" });
        } else {
          console.log(result)
          res.status(200).json({ status: true, data: result });
        }
      }
    );
  });

  router.post("/add_new_product", upload.single("image"), function (req, res) {
    pool.query(
      "insert into products ( categoryid, companyid, productname, description, status, trending, deals, pricetype, image, createdat, updateat, createdby) values(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.categoryid,
        req.body.companyid,
        req.body.productname,
        req.body.description,
        req.body.status,
        req.body.trending,
        req.body.deals,
        req.body.pricetype,
        req.file.originalname,
        req.body.createdat,
        req.body.updateat,        
        req.body.createdby,
      ],
      function (error, result) {
        console.log(req.body);
        console.log(req.file);
        if (error) {
          console.log(error);
          res.status(500).json({ status: false, message: "server error" });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Product registered succesfully" });
        }
      }
    );
  });


router.post('/fetch_all_products',function(req,res){
  console.log(req.body)
  pool.query("select P.*,(select C.companyname from company C where C.companyid=P.companyid)as companyname,(select CC.category from category CC where CC.categoryid=P.categoryid) as category from products P where P.companyid=?",[req.body.companyid],function(error,result){
    if(error){
         res.status(200).json({status:false,message:'Server Error'})
    }
    else{
      res.status(200).json({status:true,data:result})
    }
  })
})

router.post('/edit_product_data',function(req,res){
  pool.query("update products set  categoryid=?, companyid=?, productname=?, description=?, status=?, trending=?, deals=?, pricetype=?, createdat=?, updateat=?, createdby=? where productid=?",[
    req.body.categoryid,
    req.body.companyid,
    req.body.productname,
    req.body.description,
    req.body.status,
    req.body.trending,
    req.body.deals,
    req.body.pricetype,
    req.body.createdat,
    req.body.updateat,
    req.body.createdby,
    req.body.productid
  ],
  function (error, result) {
    if (error) {
      console.log(error);
      res.status(200).json({ status: false, message: "server error" });
    } else {
      res.status(200).json({ status: true, message: "product Edited succesfully" });
    }
  })
})

router.post('/edit_product_image',upload.single('image'),function(req,res){
  pool.query("update products set image=? where productid=?",[req.file.originalname,req.body.productid],function(error,result){
    if(error){
      console.log(error);
      res.status(200).json({ status: false, message: "server error" });

    }
    else{
      res.status(200).json({ status: true, message: "Image Updated" });
    }
  })
  
})

router.post('/delete_product_data',function(req,res){
  pool.query("delete from products where productid=?",[req.body.productid],function(error,result){
    if(error){
      console.log(error);
      res.status(200).json({ status: false, message: "server error" });

    }
    else{
      res.status(200).json({ status: true, message: "product Deleted Succesfully" });
    }
  })
  
})
module.exports=router