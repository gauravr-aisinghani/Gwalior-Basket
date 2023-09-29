import { Grid,Box,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Paper,Button,useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import InboxIcon from '@mui/icons-material/Inbox';
import { useNavigate } from "react-router-dom";
import { ServerUrl, getData,postData } from "../../services/ServerServices";
import DraftsIcon from '@mui/icons-material/Drafts';
import { useEffect,useState,useCallback } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
export default function CategoryInfo(props){
   let navigate=useNavigate()
    const [categories,setCategories]=useState([])
    const [categoryId,setCategoryId]=useState(props.categoryid)
    const [selectedIndex, setSelectedIndex] = useState('');
   const [products,setProducts]=useState([])
  
    const handleListItemClick = (event, index) => {
    
      
        setCategoryId(event.categoryid)
        setSelectedIndex(index);
      fetchAllProducts(event.categoryid)
     
    };
    console.log("CategoryInfo",categoryId)
    let theme=useTheme()
    let dispatch=useDispatch()
    const xs = useMediaQuery(theme.breakpoints.up('xs'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
  

    /************Definning Functions */

    useEffect(function(){
      
       setCategoryId(props.categoryid)
        fetchAllCategories()
        fetchAllProducts(props.categoryid)

    },[])

    const fetchAllCategories=async()=>{
        let result=await getData('userinterface/fetch_categories')
        setCategories(result.data)
        

    }

    const handleProductDetails=(item)=>{
      navigate('/productdetails',{state:{data:JSON.stringify(item)}})

    }
    const fetchAllProducts=async(categoryid)=>{
       let body={categoryid:categoryid}
        let result=await postData('userinterface/fetch_products_by_categoryid',body)
        setProducts(result.data)
       
        

    } 
    const handleAddClick=useCallback(item=>{
            console.log("mai hu item",item)
           props.onStateChange(dispatch({type:'ADD_CART',payload:[item.productlistid,item]}))
           
    },[props.onStateChange])

    const playImages=()=>{
        return(
            products.map((item)=>{
                return(
                   
            <Paper onClick={()=>handleProductDetails(item)} elevation={2} sx={{width:lg?'14%':md?"19.5%":sm?'33%':'48%',height:md?"16.3%":sm?'25%':'50%',border:'0.3 solid black',cursor:'pointer'}}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'100%',height:'100%',padding:'7%'}}>
              
            <img src={`${ServerUrl}/images/${item.image}`} style={{width:md?'5rem':sm?'3.5rem':'3rem',height:md?'5rem':sm?'3.5rem':'3rem',margin:'auto'}}/>
            <div style={{display:'flex',alignItems:'center',height:'3rem'}}>
            <p style={{fontWeight:'700',marginTop:'0.5rem',fontSize:'1rem'}}>{item.productname}</p>
            </div>
            <p style={{marginTop:'0.45rem',fontSize:'1rem'}}>{item.weight}{item.pricetype}</p>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'0.7rem',width:'100%'}}>
              <div>
            <s><p style={{fontSize:'0.8rem'}}>&#8377;{item.price}</p></s>
            <p style={{fontSize:'1rem',fontWeight:'700'}}>&#8377;{item.offerprice}</p>
            </div>
           
            <Button  variant="outlined" sx={{width:'1.5em',height:'2em',color:'#FF3269'}} onClick={()=>handleAddClick(item)}  style={{borderRadius:'10%',width:'2rem',borderColor:'#FF3269'}}>Add</Button>
            
            </div>
            </div>
          
            </Paper>
               
                )
            })

        )
    }

   
    const exploreList=()=>{
        return(
            categories.map((item,index)=>{
                return(
                 
                  <ListItem disablePadding sx={{height:'5rem'}}>
                    <ListItemButton  selected={selectedIndex === index}
          onClick={() => handleListItemClick(item, index)} >
                    <div style={{display:'flex',flexDirection:sm?'row':'column',justifyContent:sm?'center':'left'}}>
                      <ListItemIcon>
                      <Avatar
          alt="Remy Sharp"
          src={`${ServerUrl}/images/${item.icon}`}
         
        />            
                      </ListItemIcon>
                      <p style={{fontSize:md?'1rem':sm?'1rem':'0.6rem',overflow:'hidden'}}>{item.category}</p>
                      </div>
                    </ListItemButton>
                  </ListItem>
                 
               

                )

            })
        )
    }

    
    /********************** */
    return(
        <div style={{width:md?'90%':'100%',display:'flex',margin:lg?'auto':'0px'}}>
           <Grid container spacing={sm?.2:0} sx={{marginTop:'0.1rem',width:'100%'}}>
            <Grid item xs={2} sm={3} md={2}>
            <Paper>
                    <Box sx={{ width: '100%', maxWidth: 360, }}>
              <nav aria-label="main mailbox folders">
                <List   sx={{
            // selected and (selected + hover) states
            '&& .Mui-selected, && .Mui-selected:hover': {
              bgcolor: '#f0ccff',
              '&, & .MuiListItemIcon-root': {
               color:'#7C0AB1'
              },
            },
            // hover states
            '& .MuiListItemButton-root:hover': {
              bgcolor: '#f0ccff',
              '&, & .MuiListItemIcon-root': {
                
              },
            },
            overflow:'auto',
            maxHeight:'100vh',
            
            position:'sticky'

            

          }} className='scrollbar'>
               {exploreList()}
               </List>
              </nav>
              </Box>
              </Paper>
              
            </Grid>
            <Grid item xs={10} sm={9} md={10}>
            <div style={{display:'flex',flexWrap:'wrap',rowGap:'0.1rem',columnGap:'0.1rem',alignItems:'center',flexDirection:'row',width:'100%'}}>
             {playImages()}.
             </div>
           </Grid>

           </Grid>
           <style>{`
       .scrollbar::-webkit-scrollbar {
        display: none;
    }
        
      `}</style> 
            </div>
    )
}