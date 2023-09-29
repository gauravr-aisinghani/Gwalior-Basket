var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

/// Add Product Image -------->>>>>>>>>>>>>>>>>

 

router.get("/fetch_categories", function (req, res) {
  pool.query("select * from category",function(error,result){
   if(error)
   {
    res.status(500).json({status:false,data:[]})
   }
   else
   {
    res.status(200).json({status:true,data:result})
   }


  })
})

router.post("/fetch_products_by_categoryid", function (req, res) {
  
  pool.query("select DISTINCT P.*,(select PL.weight from productlist PL where PL.productid=P.productid limit 1)as weight,(select PL.price from productList PL where PL.productid=P.productid limit 1)as price,(select PL.offerprice from productlist PL where PL.productid=P.productid limit 1 )as offerprice,(select PL.productlistid from productlist PL where PL.productid=P.productid limit 1) as productlistid,(select PL.images from productlist PL where PL.productid=P.productid limit 1 ) as images from products P where P.categoryid=?  ",[req.body.categoryid],function(error,result){
   if(error)
   {
   
    res.status(500).json({status:false,data:[]})
    console.log(error)
   }
   else
   {
    res.status(200).json({status:true,data:result})
   }


  })
})

router.post("/fetch_products_by_productid", function (req, res) {
  
  pool.query("select PL.*,(select P.productname from products P where PL.productid=P.productid)as productname,(select P.image from products P where PL.productid=P.productid)as image,(select P.pricetype from products P where PL.productid=P.productid)as pricetype from productlist PL where PL.productid=?",[req.body.productid],function(error,result){
   if(error)
   {
   
    res.status(500).json({status:false,data:[]})
    console.log(error)
   }
   else
   {
    res.status(200).json({status:true,data:result})
   }


  })
})

router.post("/fetch_products_information", function (req, res) {
  
  pool.query("select PL.*,(select P.productname from products P where P.productid=PL.productid) as productname,(select P.pricetype from products P where P.productid=PL.productid) as pricetype from productlist PL where PL.productid=?",[req.body.productid],function(error,result){
   if(error)
   {
   
    res.status(500).json({status:false,data:[]})
    console.log(error)
   }
   else
   {
    res.status(200).json({status:true,data:result})
   }


  })
})


 

router.get("/fetch_trending_products", function (req, res) {
    pool.query("select * from products where trending='yes'",function(error,result){
     if(error)
     {
      console.log(error)
      res.status(500).json({status:false,data:[]})
     }
     else
     {
      res.status(200).json({status:true,data:result})
     }
  
  
    })
  })
module.exports = router;