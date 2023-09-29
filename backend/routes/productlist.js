var express=require('express')
var router=express.Router()
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
  router.post("/fetch_all_products", function (req, res) {
   
    pool.query(
      "select * from products where categoryid=?",[req.body.categoryid],
     
      
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

  router.post("/add_new_productlist", upload.any(), function (req, res) {
    console.log(req.files)
    console.log(req.body)
    let images='';
    req.files.map((item)=>{
        images+=item.originalname+",";
    })
    pool.query(
      "insert into productlist ( companyid, categoryid, productid, weight, price, offerprice, description, images,createdat, updateat, createdby) values(?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.companyid,
        req.body.categoryid,
        req.body.productid,
        req.body.weight,
        req.body.price,
        req.body.offerprice,
        req.body.description,
        images,
        
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
            .json({ status: true, message: "Registered succesfully" });
        }
      }
    );
    
  });

module.exports=router;