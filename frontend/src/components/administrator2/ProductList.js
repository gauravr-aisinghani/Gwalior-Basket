import { Grid, TextField,Paper, IconButton, Avatar, Button,MenuItem,FormControl,InputLabel,Select } from "@mui/material";
import { useState,useEffect } from "react";
import ListIcon from '@mui/icons-material/List';
import { useStyles } from "./ProductLIstCss";
import { DropzoneArea } from "react-mui-dropzone";
import Swal from "sweetalert2";
import { postData } from "../services/ServerServices";
export default function ProductList() {
  /* defining States */
  const [companyId,setCompanyId]=useState('')
  const [productId,setProductId]=useState('')
  const [products,setProducts]=useState([])
  const [companyName, setCompanyName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categories,setCategories]=useState([]);
  const [description, setDescription] = useState("");
  const [productName,setProductName]=useState('')
  const [weight,setWeight]=useState('')
  const [price,setPrice]=useState('')
  const [offerPrice,setOfferPrice]=useState('')
  const [images, setImages] = useState([])
 /* defining variable*/
 let classes=useStyles()
 let admin=JSON.parse(localStorage.getItem('ADMIN'))

 /* defininig functions */
 const handleImage=(files)=>{
   setImages(files)
   alert(JSON.stringify(images))
 }

 useEffect(function(){
  fetchAllCategory(admin.companyid)
 },[])
 const handleCompanyChange=(event)=>{
    setCompanyId(event.target.value)
    fetchAllCategory(event.target.value)

   }
   const handleCategoryChange=(event)=>{
    setCategoryName(event.target.value)
    fetchAllProducts(event.target.value)
}

const fetchAllProducts=async(categoryid)=>{
    var body={'categoryid':categoryid}
    var result=await postData('productlist/fetch_all_products',body)
    
    setProducts(result.data)
    
 
  }

  const handleProductChange=(event)=>{
    setProductName(event.target.value)
  }
  const FillProducts=()=>{
    return (
      products.map((item)=>{
        return(
          <MenuItem value={item.productid}>{item.productname}</MenuItem>
        )
      })
    )      
  }

    const fetchAllCategory=async(companyid)=>{
      var body={'companyid':companyid}
      var result=await postData('productlist/fetch_all_categories',body)
      
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

 const handleSubmit=async()=>{
  var cd=new Date()
  let dd=cd.getFullYear()+ "/" + (cd.getMonth()+1) + "/" + cd.getDate() +"  " + cd.getHours() + ":" + cd.getMinutes()
    let formData= new FormData()
    formData.append('companyid',admin.companyid)
    formData.append('categoryid',categoryName)
    formData.append('productid',productName)
    formData.append('weight',weight)
    formData.append('price',price)
    formData.append('offerprice',offerPrice)
    formData.append('description',description)
    images.map((item,i)=>{
        formData.append("picture"+i,item)
    })
    formData.append('createdat',dd)
    formData.append('updateat',dd)
    formData.append('createdby',dd)
    
    let result=await postData('productlist/add_new_productlist',formData)
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
  setCategoryName('')
  setProductName('')
  setWeight('')
  setPrice('')
  setOfferPrice('')
  setDescription('')
  setImages([])
 }
  return (
    <div className={classes.mainContainer}>
        <div >
          <Paper elevation={4} className={classes.box}>
      <Grid container spacing={2}>
      <Grid item xs={12} className={classes.headingStyle}>
            
            <div>
              <img
                src="/assets/companylogo.png"
                width="35"
                style={{ marginRight: 6 }}
              />
              
               
            </div>  
            <div>
              Product List 
              </div>     
            
           
            <div >
              <ListIcon fontSize="large" style={{marginLeft:600,cursor:'pointer'}}   />
            </div>
            
            
          </Grid>
        <Grid item xs={6}>
          <TextField
            label="Company Id"
            value={admin.companyid}
            variant="outlined"
            fullWidth
            disabled
           onChange={handleCompanyChange}
          />
        </Grid>
        <Grid item xs={6}>
         
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryName}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value={'Choose category'}>---Choose Category---</MenuItem>
                {FillCategories()}
              </Select>
            </FormControl>
          
        </Grid>
        <Grid item xs={6}>
         
         <FormControl fullWidth>
           <InputLabel id="demo-simple-select-label">Product</InputLabel>
           <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={productName}
             label="Product"
            onChange={handleProductChange}
           >
             <MenuItem value={'Choose Product '}>---Choose Product---</MenuItem>
             {FillProducts()}
           </Select>
         </FormControl>
       
     </Grid>
        <Grid item xs={6}>
          <TextField
            label="Weight"
            value={weight}
            variant="outlined"
            fullWidth
            onChange={(event)=>setWeight(event.target.value)}
          />
        </Grid>
        
       
        
        <Grid item xs={6}>
          <TextField
            label="Price"
            value={price}
            variant="outlined"
            fullWidth
            onChange={(event)=>setPrice(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Offer Price"
            value={offerPrice}
            variant="outlined"
            fullWidth
            onChange={(event)=>setOfferPrice(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            variant="outlined"
            fullWidth
            onChange={(event)=>setDescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
        <DropzoneArea
  acceptedFiles={['image/*']}
  dropzoneText={"Drag and drop an image here or click"}
  onChange={(files) =>handleImage(files)}
  filesLimit={5}
/>
</Grid>
        <Grid item xs={6}>
            <Button onClick={handleSubmit} variant="outlined" fullWidth type='submit'>Submit</Button>
           

        </Grid>
        <Grid item xs={6}>
            <Button onClick={handleReset}  variant="outlined" fullWidth type='reset'>Reset</Button>
           

        </Grid>
      </Grid>
      </Paper>
      </div>
    </div>
  );
}
