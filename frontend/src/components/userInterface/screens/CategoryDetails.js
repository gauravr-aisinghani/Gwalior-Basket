import Header from "../usercomponents/Header"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import CategoryInfo from "../usercomponents/CategoryInfo"
export default function CategoryDetails(){
    let location=useLocation()
    const [categoryId,setCategoryId]=useState(location.state.categoryid)
    const [refresh,setRefresh]=useState(false)
    console.log('location',location)
    
    return(
        
        <div style={{overflow:'hidden'}}>
            <div>
                <Header/>
            </div>
            
            <div>
                <CategoryInfo refresh={refresh} categoryid={categoryId} onStateChange={setRefresh}/>
            </div>
            </div>
    )
}