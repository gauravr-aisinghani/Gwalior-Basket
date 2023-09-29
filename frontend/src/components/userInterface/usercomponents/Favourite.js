import React,{createRef} from "react";
import Slider from "react-slick";
import {ServerUrl} from "../../services/ServerServices"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spacer from "./Spacer";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function Favourite()
{   let slider=createRef()
  const theme = useTheme();
  const matche = useMediaQuery(theme.breakpoints.up('sm'));
     var settings = {
   
    dots: false,
    infinite: true,
    autoplay:false,
    autopalyspeed:4000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows:false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
         
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
         
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          
        }
      }
    ]
  };
 
  var images=['deal1.webp','deal2.webp','deal3.webp','deal4.webp','deal5.webp']
 
  function handleLeftClick(){
    slider.current.slickNext()
    }
    function handleRightClick()
    {
      slider.current.slickPrev()
  
    }


  function playImages()
  { return images.map((item)=>{
        return(<div><img src={`${ServerUrl}/images/${item}`} style={{width:'100%',objectFit:'contain'}}/></div>)
  })
  } 


  return(
      <div style={{width:'90%'}}>
      <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
        <p style={{fontSize:'1.45rem',fontWeight:'600'}}>
           Your Favourite Picks
        </p>
        {matche?
        <div style={{width:'4%',display:'flex'}}>
            <KeyboardArrowLeftIcon onClick={handleLeftClick} style={{fontSize:'2rem',fontWeight:'bold',color:'black',cursor:'pointer'}}/>
            <KeyboardArrowRightIcon onClick={handleRightClick} style={{fontSize:'2rem',fontWeight:'bold',color:'black',cursor:'pointer'}}/>
        
        </div>:<></>
}
      </div>
      <Spacer/>
      <Slider ref={slider} {...settings}  >
        {playImages()}
      </Slider>
     
       </div> 

      
   
  )

}