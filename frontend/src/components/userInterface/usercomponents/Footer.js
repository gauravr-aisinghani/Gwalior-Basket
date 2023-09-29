import { Grid,Paper } from "@mui/material"
import Spacer from './Spacer'
import { ServerUrl } from "../../services/ServerServices"
export default function Footer(){
    return(
        <div style={{display:'flex',alignItems:'center',flexDirection:'column',width:'100%'}}>
    
        
        <div style={{width:'80%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
        <h3>How it Works</h3>
        <Spacer/>
        <Grid container spacing={3.5}>
        <Grid item xs={12} md={4}>
                <Paper elevation={4} style={{display:'flex',alignItems:'center',justifyContent:'center',height:'230px',padding:'0.4rem',boxSizing:'border-box'}} >
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                     <img src={`${ServerUrl}/images/place-order.svg`}/>
                     <h4>Place an Order</h4>
                     <p style={{marginTop:'1rem',width:'70%',lineHeight:'1.2rem',textAlign:'center'}}>Choose from a wide range of daily essentials</p>
                     </div>
                    </Paper>

            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={4} style={{display:'flex',alignItems:'center',justifyContent:'center',height:'230px',padding:'0.4rem',boxSizing:'border-box'}} >
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                     <img src={`${ServerUrl}/images/do-not-blink.svg`}/>
                     <h4>Don't Blink</h4>
                     <p style={{marginTop:'1rem',width:'70%',lineHeight:'1.2rem',textAlign:'center'}}>Our delivery partner will be at your door</p>
                     </div>
                    </Paper>

            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={4} style={{display:'flex',alignItems:'center',justifyContent:'center',height:'230px',padding:'0.4rem',boxSizing:'border-box'}} >
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                     <img src={`${ServerUrl}/images/enjoy.svg`}/>
                     <h4>Enjoy</h4>
                     <p style={{marginTop:'1rem',width:'70%',lineHeight:'1.2rem',textAlign:'center'}}>Boom! You’ll never have to wait for groceries again</p>
                     </div>
                    </Paper>

            </Grid>

        </Grid>
        </div>
        <Spacer/> 
        <Spacer/>
       
        <div style={{dispaly:'flex',width:'90%',justifyContent:'left'}}>
        <p style={{fontSize:'1.45rem',fontWeight:'600'}}>
            Categories
        </p> 
            </div> 
        
         
      
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'90%',flexDirection:'column'}}>
            <Grid container spacing={4}>
                
                <Grid item xs={12} sm={6} md={3}>
                  <div style={{display:'flex',flexDirection:'column'}}> 
                    <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Fruiets & vegetables</a>
                    <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Baby Food</a>
                    <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Breakfast & Souces</a>
                    <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Cleaninig Assentials</a>
                    <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>HomeGrown Brands</a>
                    </div>
                    
                  

                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <div style={{display:'flex',flexDirection:'column'}}> 
                <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Tea,Coffe & More</a>
                <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Dairy,Bread & Eggs</a>
                <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Atta,Dal & Rice</a>
                <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Home Needs</a>
                <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Paan</a>
                    </div> 
   
                   </Grid>
                   <Grid item xs={12} sm={6} md={3}>
                   
                   <div style={{display:'flex',flexDirection:'column'}}> 
                   <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Masala & Dryfruiets</a>
                   <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Cold Drinks & Juices</a>
                   <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Buiscuits</a>
                   <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Electronics & Accesries</a>
                     </div>
   
                   </Grid>
                   <Grid item xs={12} sm={6} md={3}>
                   
                   <div style={{display:'flex',flexDirection:'column'}}> 
                   <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Bath & Body</a>
                   <a href="#"  style={{lineHeight:'1.2rem',marginTop:'1.3rem',color:'black',textDecoration:'none'}}>Healt & Baby Care</a>
                  </div>
                 

               </Grid>




            </Grid>

        </div>
        
        
      
      </div>
    )

}