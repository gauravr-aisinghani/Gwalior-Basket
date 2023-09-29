import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Button, useMediaQuery,Grid,Paper } from "@mui/material"
import {useTheme} from "@mui/material/styles"
import Spacer from "../usercomponents/Spacer"
import { ServerUrl} from "../../services/ServerServices"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Header from "../usercomponents/Header"
export default function Cart() {
    let products = useSelector((state) => state.cart)
    let theme=useTheme()
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    useEffect(function(){
        showProduct()
    },[])
    const showProduct=()=>{
        console.log("Products",products)

    }
   
    return (
        <div style={{overflow:'hidden',width:'100vw',background:'#f2f2f2',height:'100vh'}}>
            <Header />
         <div style={{backgroundImage:`url(${ServerUrl}/images/linearbackground.png)`,width:'100vw',height:'60px',display:'flex',justifyContent:'center',alignItems:"center"}}>
            <div style={{display:'flex',alignItems:'center'}}>
            <img src={`${ServerUrl}/images/delivery.svg`} width={sm?"80rem":"100rem"} />
           <span style={{color:'#fff',fontSize:sm?'1rem':'1.2rem'}}> Delivering to you in 7 mins</span>
            </div>
         
         </div>
         <Spacer/>
        <div style={{width:lg?'100%':'60%',margin:'auto'}}>
            <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0rem 1rem 0rem 1rem'}}>
            <h3>Cart(1 Item)</h3>
            <Button variant="outlined" size="small" sx={{color:'#FF3269',borderColor:'#FF3269'}}>Empty Cart</Button>
            </div>
            <div>
                <Grid container rowSpacing={sm?1:0.7} columnSpacing={2} sx={{marginTop:'2rem'}}>
                   { /**************left Part */}
                    <Grid item xs={12} md={7} sm={7}>
                    <Paper elevation={2.5} sx={{background:'#fff',padding:'1rem',display:'flex',columnGap:'1rem',borderRadius:'0.4rem'}}>
                       
                    <img src={`${ServerUrl}/images/butter.webp`} width="14%" style={{objectFit:"contain"}}/>
                   <div style={{display:'flex',flexDirection:'column',rowGap:"1.3rem",width:'24rem'}}>
                    <div><p style={{fontSize:'1rem',fontWeight:'500'}}> Mother's Receipe Mixed Pickle</p>
                    <p style={{fontSize:'0.8rem',fontWeight:'300'}}> 500 gram</p>
                    </div>
                    <h3>&#8377;135 </h3>
                   </div>
                  
                   <Button variant="outlined"  sx={{color:'#FF3269',borderColor:'#FF3269',height:'2rem',width:'1.5rem'}}>ADD</Button>

                </Paper>
                        </Grid>
                        
                    
                    {/************Right part */}
                    <Grid item container xs={12} md={5} sm={5} columnSpacing={2} rowSpacing={sm?1:0.7}>
                        <Grid item xs={12} >
                    <Paper elevation={2.5} sx={{background:'#fff',padding:'1rem',borderRadius:'0.4rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        Avail Offers/Coupens
                        <ArrowRightIcon style={{fontSize:'2.1rem',color:'#FF3269'}}/>
                      </Paper>
                      </Grid>
                      <Grid item xs={12}>
                    <Paper elevation={2.5} sx={{background:'#fff',padding:'1rem',borderRadius:'0.4rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        Avail Offers/Coupens
                        <ArrowRightIcon style={{fontSize:'2.1rem',color:'#FF3269'}}/>
                      </Paper>

                    </Grid>

                    </Grid>
                    {/********************** */}
                    <Grid item xs={12} md={7} sm={7}>
                    <Paper elevation={2.5} sx={{background:'#fff',padding:'1rem',display:'flex',columnGap:'1rem',borderRadius:'0.4rem'}}>
                       
                    <img src={`${ServerUrl}/images/butter.webp`} width="14%" style={{objectFit:"contain"}}/>
                   <div style={{display:'flex',flexDirection:'column',rowGap:"1.3rem",width:'24rem'}}>
                    <div><p style={{fontSize:'1rem',fontWeight:'500'}}> Mother's Receipe Mixed Pickle</p>
                    <p style={{fontSize:'0.8rem',fontWeight:'300'}}> 500 gram</p>
                    </div>
                    <h3>&#8377;135 </h3>
                   </div>
                  
                   <Button variant="outlined"  sx={{color:'#FF3269',borderColor:'#FF3269',height:'2rem',width:'1.5rem'}}>ADD</Button>

                </Paper>
                        </Grid>

                   

                    
                       


                </Grid>
            </div>
            </div>
        </div>
    )
}