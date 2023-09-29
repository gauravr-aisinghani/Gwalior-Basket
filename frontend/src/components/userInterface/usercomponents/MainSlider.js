import React,{createRef,useState,useEffect} from "react";
import Slider from "react-slick";
import {ServerUrl,getData} from "../../services/ServerServices"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spacer from "./Spacer";
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function MainSlider()
{  const theme = useTheme();
   const matche = useMediaQuery(theme.breakpoints.up('sm'));
   const [images,setImages]=useState([])
  var settings = {
    className:'slider variable-width',
    dots:true ,
    infinite: true,
    autoplay:false,
    autopalyspeed:4000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
         
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots:false,
          arrows:false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots:false,
          arrows:false
        }
      }
    ]
  };
 
  
  const arrowStyles = {
    color: "#3C006B", // Change the color to your desired color
    fontSize: "24px", // Adjust font size as needed
  };
  const slideStyle={
    margin:'0 10px'
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "white"}}
        onClick={onClick}
      />
    );
  }
 const fetchBannerImages=async()=>{
  var result=await getData('banner/fetch_banner_images')
 
  let im=result.data[0].pictures.split(',')
  let imm=im.slice(0,im.length-1)

  setImages(imm)
 
  
 }
  useEffect(function(){
    fetchBannerImages()
  },[])
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",  }}
        onClick={onClick}
      />
    );
  }

  function playImages()
  { return images.map((item)=>{
        return(<div><img src={`${ServerUrl}/images/${item}`} style={{width:'100%'}}/></div>)
  })
  } 


  return(
      <div style={{width:'90%'}}>
       
      
      <Slider  {...settings}  >
        {playImages()}
      </Slider>
    
      <Spacer/>
      <img src={`${ServerUrl}/images/paan.webp`} style={{width:'100%'}}/>
      
      <style>{`
        .slick-prev:before,
        .slick-next:before {
          color: ${arrowStyles.color};
          font-size: ${arrowStyles.fontSize};
        }
        .slick-slide > div {
            margin: ${slideStyle.margin} 
          }
        
      `}</style>  
      
       </div> 

      
   
  )

}