import { ServerUrl,getData } from "../../services/ServerServices"
import { useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spacer from "./Spacer"
export default function ExploreByCategories(){
    const theme=useTheme()
    const navigate=useNavigate()
    const [categories,setCategories]=useState([])
    useEffect(function(){
        fetchAllCategories()
    },[])
    const fetchAllCategories=async()=>{
        let result=await getData('userinterface/fetch_categories')
        let data=result.data
        setCategories(data)
       
    }
    const handleClick=(categoryid)=>{
         navigate('/categorydetails',{state:{categoryid:categoryid}})
    }
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    let images=['category3.webp','category4.webp','category5.webp','category6.webp','category7.webp','category8.webp','category9.webp','category10.webp','category11.webp','category12.webp','category13.webp','category14.webp','category15.webp','category16.webp','category17.webp','category18.webp','category19.webp','category20.webp','category21.webp']
    const playImages=()=>{
        return(
        categories.map((item)=>{
            return(
               
                  <img src={`${ServerUrl}/images/${item.icon}`} style={{width:sm?'11%':'20%',cursor:'pointer'}} onClick={()=>handleClick(item.categoryid)} />
                   
            )
        
        })
        )

    }
    return(
        <div style={{width:'90%',position:'relative'}} id="category">
            
            <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
        <p style={{fontSize:'1.45rem',fontWeight:'600'}}>
           Explore by Categories
        </p>
          
      <></>
     

      </div>
      <Spacer/>
      <div style={{display:'flex',flexWrap:'wrap',rowGap:'1rem',columnGap:'1rem',alignItems:'center'}}>
      {playImages()}
      </div>
       

        
      
           
      </div>

       
    )
}