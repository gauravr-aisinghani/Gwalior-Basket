import { Grid,Paper,IconButton,Button,Avatar, TextField,FormControl,InputLabel,Select,MenuItem,Box,RadioGroup,FormLabel,FormControlLabel,Radio } from "@mui/material";
import { useStyles } from "./ProductCss";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Swal from "sweetalert2";
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from "react-router-dom";
import { postData,getData } from "../services/ServerServices";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
export default function Products() {
    /* defining Variables */
    let classes=useStyles()
    let navigate=useNavigate()
    let admin=JSON.parse(localStorage.getItem('ADMIN'))
    /******************** */
    /* defining states */
    const [companyId,setCompanyId]=useState('')
    const [category,setCategory]=useState('')
    const [product,setProduct]=useState('')
    const [description,setDescription]=useState('')
    const [status,setStatus]=useState('')
    const [trending,setTrending]=useState('')
    const [categories,setCategories]=useState([])
    const [deals,setDeals]=useState('')
    const [priceType,setPriceType]=useState('')
    const [image,setImage]=useState({
      fileName:'/assets/companylogo.png',
      bytes:''
    })
    /****************************** */
    /***Defining functions */
    const handleCategoryChange=(event)=>{
         setCategory(event.target.value)
    }
   
   const handleDealsChange=(event)=>{
    setDeals(event.target.value)
   }
   const handleStatusChange=(event)=>{
    setStatus(event.target.value)
   }
   const handleTrendingChange=(event)=>{
    setTrending(event.target.value)
   }
   const handlePriceChange=(event)=>{
    setPriceType(event.target.value)
   }
   const handleImage=(event)=>{
    setImage({
      fileName:URL.createObjectURL(event.target.files[0]),
      bytes:event.target.files[0]
    })
   }
   
   const handleCompanyId=(event)=>{
    setCompanyId(event.target.value)
    fetchAllCategory(admin.companyid)

   }

    const fetchAllCategory=async(companyid)=>{
      var body={'companyid':companyid}
      var result=await postData('products/fetch_all_categories',body)
      
      setCategories(result.data)
      
   
    }
    
    const FillCategories=()=>{
      return (
        categories.map((item)=>{
          return(
            <MenuItem value={item.categoryid}>{item.category}</MenuItem>
          )
        })
      )      
    }

    useEffect(function(){
       fetchAllCategory(admin.companyid)
    },[companyId])

     const handleSubmit=async()=>{
      var cd=new Date()
    let dd=cd.getFullYear()+"/"+ (cd.getMonth()+1) +"/" +cd.getDate()+ "  " +cd.getHours()+":" + cd.getMinutes()
      let formData=new FormData()
      formData.append('categoryid',category)
      formData.append('companyid',admin.companyid)
      formData.append('productname',product)
      formData.append('description',description)
      formData.append('status',status)
      formData.append('trending',trending)
      formData.append('deals',deals)
      formData.append('pricetype',priceType)
      formData.append('image',image.bytes)
      formData.append('createdat',dd)
      formData.append('updateat',dd)
      formData.append('createdby',"Admin")

      var result= await postData('products/add_new_product',formData)
      if(result.status){
        Swal.fire({
          icon: 'success',
          title: result.message,
         
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: result.message,
          
        })
      }
     handleReset()
     }

     const handleReset=()=>{
      setCompanyId('')
      setCategory('')
      setProduct('')
      setDescription('')
      setStatus('')
      setTrending('')
      setDeals('')
      setPriceType('')
      setImage({
        fileName: "/assets/watermark.png",
        bytes: "",
      });
    }
  
    
   
   /************************ */
    
  return (
    <div className={classes.mainContainer}>
        <div >
          <Paper elevation={4} className={classes.box}>
      <Grid container spacing={2}  >
      <Grid item xs={12} className={classes.headingStyle}>
            
            <div style={{display:'flex',flexDirection:'row'}}>
               <img
                 src="/assets/companylogo.png"
                 width="35"
                 style={{ marginRight: 6 }}
               />
               
                
               
             <div>
               Product Registration
               </div>     
               </div>
            
             <div>
               <ListIcon fontSize="large" style={{cursor:'pointer'}} onClick={()=>navigate('/dashboard/displayallproducts')}  />
             </div>
             
             
             
           </Grid>
        <Grid item xs={6}>
          <TextField disabled  value={admin.companyid} onChange={handleCompanyId}  fullWidth label="Company Id" variant="outlined" />
        </Grid>
        <Grid item xs={6}>
         
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value={'Choose category'}>---Choose Category---</MenuItem>
                {FillCategories()}
              </Select>
            </FormControl>
          
        </Grid>
        <Grid item xs={6} >
            <TextField fullWidth onChange={(event)=>setProduct(event.target.value)} value={product} label="Product Name" variant="outlined"/>
      </Grid>
      <Grid item xs={6} >
            <TextField fullWidth onChange={(event)=>setDescription(event.target.value)} value={description} label="Description" variant="outlined"/>
      </Grid>
      <Grid item xs={4} >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                fullWidth
                onChange={handleStatusChange}
              >
                <MenuItem value={"---Choose Status---"} >---Choose Status---</MenuItem>
                <MenuItem value={"Available"} >Available</MenuItem>
                <MenuItem value={'Not Available'} >Not Available</MenuItem>
                
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end" >
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Trending</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        fullWidth
        value={trending}
        onChange={handleTrendingChange}
       
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
    
      
      </RadioGroup>
    </FormControl>
            </Grid>
            <Grid item xs={4} container justifyContent='flex-end'>
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Deals</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={deals}
        fullWidth
        onChange={handleDealsChange}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
    
      
      </RadioGroup>
    </FormControl>
            </Grid>
        <Grid item xs={6}>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Price Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priceType}
                label="Price Type"
                fullWidth
                onChange={handlePriceChange}
              >
                <MenuItem value={"---Choose PriceType---"} >---Choose PriceType---</MenuItem>
                <MenuItem value={'kg'} >kg</MenuItem>
                <MenuItem value={'gram'} >gram</MenuItem>
                <MenuItem value={'leter'} >leter</MenuItem>
                <MenuItem value={'pcs'} >pcs</MenuItem>
                <MenuItem value={'ml'} >ml</MenuItem>
                
              </Select>
            </FormControl>
          </Box>
            
            </Grid>
            <Grid item xs={6} className={classes.rowStyle}>
            <IconButton
              fullWidth
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                onChange={handleImage}
                accept="image/*"
                type="file"
              />
              <PhotoCameraIcon />
            </IconButton>
            <Avatar
              alt="Remy Sharp"
              src={image.fileName}
              sx={{ width: 56, height: 56 }}
              variant="square"
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" onClick={handleSubmit} type="submit" fullWidth>Submit</Button>
            
            </Grid>
            <Grid item xs={6}>
            <Button variant="outlined" onClick={handleReset} type="reset" fullWidth>Reset</Button>
            
            </Grid>
      </Grid>
      </Paper>
      </div>
    </div>
  );
}
