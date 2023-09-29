import { useMediaQuery,Button,Box } from "@mui/material"
import {useTheme} from "@mui/material/styles"
import { useDispatch } from "react-redux"
import { useEffect,useState } from "react"
import { useLocation } from "react-router-dom"
import { postData } from "../../services/ServerServices"
export default function ProductQuantity(props){
    let theme=useTheme()
    let dispatch=useDispatch()
    let location=useLocation()
    let data=props.data
    const [productList,setProductList]=useState([])
    let sm=useMediaQuery(theme.breakpoints.down('sm'))
    useEffect(function(){
        fetchAllProducts()

    },[])

    const fetchAllProducts=async()=>{
        let body={productid:data.productid}
        let result=await postData('userinterface/fetch_products_by_productid',body)
        setProductList(result.data)
    }
    
    const handleCart=(item)=>{
      dispatch({type:'ADD_CART',payload:[item.productlistid,item]})
      props.handleRefresh()
    }
    const exploreProducts=()=>{
        return(
            productList.map((item)=>{
                return(
                    <div style={{width:sm?'20rem':'27rem',height:'70px',border:'1px solid #b2bec3 ',marginBottom:'1rem',justifyContent:'space-between',borderRadius:'15px',padding:'1rem',boxSizing:"border-box",display:'flex',alignItems:'center'}}>
                    <div>
                    <div style={{display:'flex',flexDirection:'row'}} >
                        <div>{item.weight}</div>
                        <div >{item.pricetype}</div>
                      </div>
                      
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          //alignItems:'center',
                          width: "12rem",
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: 20 }}>
                          &#8377;{item.offerprice}
                        </div>
                        <s style={{ display: "flex", alignItems: "center" }}>
                          &#8377;{item.price}
                        </s>
                       
                         <Box style={{background:'#3C006B',color:'white',width:'5.5rem',height:'1.7rem',borderRadius:'0.5rem',display:'flex',justifyContent:'center',alignItems:'center'}}>{parseInt(((item.price)-(item.offerprice))/(item.price)*100)}%off</Box>
                        </div>
                        </div>
                        <div>
                        <Button onClick={()=>handleCart(item)} variant="outlined" size={sm?'small':'large'} style={{background:'#FF3269',color:'white',borderRadius:'0.5rem',marginLeft:'auto'}}>Add</Button>
                          
                        </div>
                       
                </div>
                )
            })
        )
    }
    return(
        <div>
           {exploreProducts()}

        </div>
    )
}