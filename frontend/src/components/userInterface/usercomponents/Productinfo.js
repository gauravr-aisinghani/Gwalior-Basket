import { Grid, Paper,Button,Box, Divider, setRef,useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import {useTheme} from "@mui/material/styles"
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { createRef } from "react";
import Slider from "react-slick";
import { ServerUrl, postData } from "../../services/ServerServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Footer from "./Footer";
import ProductQuantity from "./ProductQuantity";


export default function Productinfo(props) {
  const [productKiList,setProductKiList]=useState([])
  const [refresh,setRefresh]=useState(false)
  const [productId,setProductId]=useState(props.productid)
    let slider=createRef()
    let dispatch=useDispatch()
    let data=JSON.parse(props.data)
    let imagesdemo=data.images.slice(0,(data.images.length)-1)
    let theme=useTheme()
    const sm=useMediaQuery(theme.breakpoints.down('sm'))
    let images=imagesdemo.split(",")
   
   
    
  var settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
   
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots:false
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots:false
        },
      },
    ],
  };

 
  useEffect(function(){
     setProductId(data.productid)
    fetchProductInformation(data.productid)
  },[])


 


 
  const fetchProductInformation = async (productid) => {
    try {
      let body = { productid: productid };
      let result = await postData('userinterface/fetch_products_information', body);
      let data = result.data;
  
      console.log("Received data from API:", data); // Debugging: Check the data received from the API
  
      setProductKiList(data);
      console.log("product ki list", data);
  
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error fetching product information:", error);
    }
  };
  

  const handleCart=(item)=>{
    dispatch({type:'ADD_CART',payload:[item.productlistid,item]})
    props.handleRefresh()

  }
  
  
  
  
  

  function playImages() {
    return images.map((item) => {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={`${ServerUrl}/images/${item}`}
            style={{ width: "240px", margin: "auto",marginTop:'1.8rem', height: "240px" }}
          />
        </div>
      );
    });
  }
  function exploreContent(){
     
      return (
        <div style={{display:'flex',flexDirection:'column'}}>
      <p style={{fontSize:'0.8rem'}}>Home Ghee Pure Cow Ghee</p>
      <h3 style={{marginTop:'0.8rem'}}>{data.productname}</h3>
      <p style={{fontSize:'1.1rem',marginTop:'0.8rem'}}>{data.weight}{data.pricetype}</p>
      <div>
        <div style={{display:'flex',justifyContent:'space-around',width:'13rem',marginTop:'2rem',alignItems:'center'}}>
        <p style={{fontSize:'1.5rem',fontWeight:'600'}}> &#8377;{data.offerprice}</p>
        <p style={{fontSize:'1rem'}}><s>&#8377;{data.price}</s></p>
        <Box style={{background:'#3C006B',color:'white',width:'5.5rem',height:'1.7rem',borderRadius:'0.5rem',display:'flex',justifyContent:'center',alignItems:'center'}}>{parseInt(((data.price)-(data.offerprice))/(data.price)*100)}%off</Box>
        </div>
        <Button onClick={()=>handleCart(data)} style={{marginTop:'2rem',background:'#FF3269',color:'white',width:'7rem',borderRadius:'0.5rem'}}>Add</Button>
      </div>
    </div>

      )
   
      
    
  }
  function handleLeftClick(){
    slider.current.slickPrev()
    }
    function handleRightClick()
    {
      slider.current.slickNext()
  
    }
  return (
    <div style={{ width: "90%", display: "flex", alignItems: "center" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: "300px",position:'relative' }} elevation={3}>
          <KeyboardArrowLeftIcon onClick={handleLeftClick} style={{fontSize:'2rem',fontWeight:'bold',color:'black',cursor:'pointer',position:'absolute',top:'122',left:'5',zIndex:1}}/>
            <Slider ref={slider} {...settings}>{playImages()}</Slider>
            <KeyboardArrowRightIcon onClick={handleRightClick} style={{fontSize:'2rem',fontWeight:'bold',color:'black',cursor:'pointer',position:'absolute',top:'122',right:'5' }}/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
         {exploreContent()}
         
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <p style={{fontSize:'1.1rem',fontWeight:'600'}}>About Product</p>
            <ul style={{fontWeight:'200',fontSize:'1rem',marginTop:'0.8rem',listStylePosition:'inside',textAlign:'justify'}}>
              <li >Description : Tomatoes are the most abundant source of the antioxidant lycopene, which has been linked to a variety of health advantages, including a lower risk of heart disease and cancer. Tomatoes are low in calories and high in nutrients such as vitamin C and potassium. They're also high in antioxidants, including lycopene, which gives tomatoes their distinctive color and has been linked to a variety of health advantages, including a lower risk of heart disease and certain cancers.</li>
              <li style={{marginTop:'0.5rem'}}>Country of Origin : India</li>
              <li style={{marginTop:'0.5rem'}}>Shelf Life : 1 Year</li>
              </ul>
          </div>
          

        </Grid>

        <Grid item xs={12} md={6}>
        
            <div style={{fontSize:19,fontWeight:500,marginBottom:8}}>
              Select the Quantity
            </div>
            <div>
                <ProductQuantity data={data} handleRefresh={props.handleRefresh}/>
            </div>
            
           

        </Grid>
        <Grid item xs={12} md={12}>
          {sm?
        <div style={{margin:'auto'}}>
          
        <p style={{fontSize:'1.2rem',fontWeight:'600',marginTop:'1.7rem'}}>How it Works</p>
          <div style={{display:'flex',flexDirection:'column',marginTop:'1.2rem',height:'4.7rem'}}>
            <div style={{display:'flex',alignItems:'center'}}>
              <Paper  style={{height:'5rem'}}>
            <img src={`${ServerUrl}/images/place-order.svg`}/>
            </Paper>
            <div style={{marginLeft:'1.6rem'}}>
             <p style={{fontSize:'1rem',fontWeight:"470"}}>Place an Order</p>
             <p style={{fontsize:'1.2rem',fontWeight:'300',marginTop:'0.4rem'}} >Choose from a wide range of daily essentials</p>
             </div>
            </div>

          </div>
          <div style={{display:'flex',flexDirection:'column',marginTop:'1.2rem',height:'4.7rem'}}>
            <div style={{display:'flex',alignItems:'center'}}>
              <Paper style={{height:'5rem'}}>
              <img src={`${ServerUrl}/images/do-not-blink.svg`}/>
            </Paper>
            <div style={{marginLeft:'1.6rem'}}>
             <p style={{fontSize:'1rem',fontWeight:"470"}}>Don't Blink</p>
             <p style={{fontsize:'1.2rem',fontWeight:'300',marginTop:'0.4rem'}} >Choose from a wide range of daily essentials</p>
             </div>
            </div>

          </div>
          <div style={{display:'flex',flexDirection:'column',marginTop:'1.2rem',height:'4.7rem'}}>
            <div style={{display:'flex',alignItems:'center'}}>
              <Paper  style={{height:'5rem'}}>
              <img src={`${ServerUrl}/images/enjoy.svg`}/>
            </Paper>
            <div style={{marginLeft:'1.6rem'}}>
             <p style={{fontSize:'1rem',fontWeight:"470"}}>Enjoy</p>
             <p style={{fontsize:'1.2rem',fontWeight:'300',marginTop:'0.4rem'}} >Choose from a wide range of daily essentials</p>
             </div>
            </div>

          </div>
          
          </div>:<Footer/>}
        </Grid>
        
        

        
      </Grid>
     
    </div>
  );
}
