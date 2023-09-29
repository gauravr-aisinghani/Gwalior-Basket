import React,{createRef,useEffect,useState} from "react";
import Slider from "react-slick";
import {ServerUrl,getData} from "../../services/ServerServices"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spacer from "./Spacer";
import { useMediaQuery,IconButton } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import {Paper,Button} from "@mui/material"
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


export default function Trending()
{  const theme = useTheme();
  let navigate=useNavigate()
  let dispatch=useDispatch()
  const [products,setProducts]=useState([])
  useEffect(function(){
      fetchAllTrendingProducts()
  },[])
  const fetchAllTrendingProducts=async()=>{
      let result=await getData('userinterface/fetch_trending_products')
      let data=result.data
      
      setProducts(data)
     
  }
 
   const matches =  useMediaQuery('(min-width:700px)');
   let slider=createRef()
  var settings = {
    className:'slider variable-width',
    dots:false ,
    infinite: true,
    autoplay:false,
    autopalyspeed:4000,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
   arrows:false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          arrows:false,
         
        }
      },
     
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 3,
          
          dots:false,
          arrows:false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          
          dots:false,
          arrows:false
        }
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots:false,
          arrows:false
        }
      }
    ]
  };
  function handleLeftClick(){
    slider.current.slickNext()
    }
    function handleRightClick()
    {
      slider.current.slickPrev()
  
    }
 
    const handleClick=(item)=>{
      navigate('/ProductDetails',{state:{data:JSON.stringify(item),page:"Trending"}})
      alert(JSON.stringify(item))
    }
   
    const handleAddClick=()=>{
      dispatch('ADD_CART',)

    }
 
 
  const slideStyle={
    margin:'0 10px'
  }
  
  

  function playImages()
  { return products.map((item)=>{
        return(<Paper elevation={3} sx={{width:'100%',height:'100%',cursor:'pointer'}} onClick={()=>handleClick(item)}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'100%',height:'100%',padding:'7%'}}>
              
            <img src={`${ServerUrl}/images/${item.image}`} style={{width:'5rem',height:'5rem',margin:'auto'}}/>
            <div style={{display:'flex',alignItems:'center',height:'3rem'}}>
            <p style={{fontWeight:'700',marginTop:'0.5rem',fontSize:'1rem'}}>{matches?((item.productname.slice(0,30))+"..."):((item.productname.slice(0,20))+"...")}</p>
            </div>
            <p style={{marginTop:'0.45rem',fontSize:'1rem'}}>Limited Stock</p>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'0.7rem',width:'100%'}}>
              <div>
            <p style={{fontSize:'0.8rem'}}>Explore Now</p>
            <p style={{fontSize:'1rem',fontWeight:'700'}}></p>
            </div>
            {matches?
            <Button  variant="outlined" sx={{width:'1.5em',height:'2em',color:'#FF3269'}}  style={{borderRadius:'10%',width:'2rem',borderColor:'#FF3269'}}>Add</Button>
            :
            <IconButton aria-label="Add" onClick={handleAddClick}><AddOutlinedIcon sx={{color:'#1976D2'}}/></IconButton>}
            </div>
            </div>
          
            </Paper>)
  })
  } 


  return(
      <div style={{width:'90%',position:'relative'}}>
        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
        <p style={{fontSize:'1.45rem',fontWeight:'600'}}>
           Trending Products
        </p>
           {matches?  <div style={{position:'absolute',zIndex:'1',top:'50%',left:'0.7%',borderRadius:'50%',background:'#fff',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',cursor:'pointer',opacity:0.7}}>
      <KeyboardArrowLeftIcon style={{fontSize:'2rem'}} onClick={handleLeftClick}/>
      </div>:<></>}
      </div>
      <Spacer/>
      <Slider ref={slider}  {...settings}   >

        {playImages()}
      </Slider>
      {matches?
      <div style={{position:'absolute',zIndex:'1',top:'50%',right:'0.7%',borderRadius:'50%',background:'#fff',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',cursor:'pointer',opacity:0.7}}>
      <KeyboardArrowRightIcon style={{fontSize:'2rem'}} onClick={handleRightClick}/>
      </div>:<></>}
    
      <Spacer/>
     
      
      
      <style>{`
        .slick-prev:before,
        .slick-next:before {
        
        }
        .slick-slide > div {
            margin: ${slideStyle.margin} 
          }
         

        
        
      `}</style>  
      
       </div> 

      
   
  )

}