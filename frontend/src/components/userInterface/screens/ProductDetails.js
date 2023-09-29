import { useState } from "react"
import Header from "../usercomponents/Header"
import Productinfo from "../usercomponents/Productinfo"
import Spacer from "../usercomponents/Spacer"
import { useLocation } from "react-router-dom"
export default function ProductDeatails (){
    let location=useLocation()
    let data=location.state.data
    
   const [productId,setProductId]=useState(location.state.productid)
   const [refresh,setRefresh]=useState(false)
   const handleRefresh=()=>{
    setRefresh(!refresh)
   }
    return(
        <div style={{overflow:'hidden'}}>
            <div>
                <Header/>
            </div>
            <Spacer/>
            <div style={{display:'flex',justifyContent:'center'}}>
                <Productinfo data={data} handleRefresh={handleRefresh}/>
            </div>
            </div>
    )
}