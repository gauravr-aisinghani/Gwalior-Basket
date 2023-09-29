import { Grid,Avatar,DialogActions,Dialog,DialogTitle,Button,IconButton,MenuItem,FormControl,InputLabel,Select,TextField,Box,Radio,FormControlLabel,RadioGroup,FormLabel, DialogContent } from "@mui/material"
import { useState,useEffect, useCallback } from "react"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./DisplayAllProductsCss"
import MaterialTable from "@material-table/core"
import CloseIcon from '@mui/icons-material/Close';
import { getData,ServerUrl,postData } from "../services/ServerServices"
import Swal from "sweetalert2";
import { json } from "react-router-dom"
import { CategorySharp } from "@mui/icons-material";
export default function DisplayAllProducts(props) {
    /* defining Variables */
    let classes=useStyles()
    let admin=JSON.parse(localStorage.getItem('ADMIN'))
let navigate=useNavigate()
    /*/////////////////////////////////*/

     /* defining States */
   const [products,setProducts]=useState([])
   const [dialog,setDialog]=useState(false)
   const [productId,setProductId]=useState('')
   const [categoryId,setCategoryId]=useState('')
   const [companyName,setCompanyName]=useState('')
   const [btnStatus,setBtnStatus]=useState(false)
   const [companyId,setCompanyId]=useState('')
    const [category,setCategory]=useState('')
    const [product,setProduct]=useState('')
    const [description,setDescription]=useState('')
    const [status,setStatus]=useState('')
    const [trending,setTrending]=useState('')
    const [categories,setCategories]=useState([])
    const [logoMessage,setLogoMessage]=useState('')
    const [oldPicture,setOldPicture]=useState('')
    const [deals,setDeals]=useState('')
    const [priceType,setPriceType]=useState('')
    const [image,setImage]=useState({
      fileName:'/assets/companylogo.png',
      bytes:''
    })

    /* defining Functions*/
    let fetch_all_products=async(companyid)=>{
     let body={companyid:companyid}
        let result= await postData('products/fetch_all_products',body)
        setProducts(result.data)
        

    }

    const handleCancelImage=()=>{
      setImage({
        fileName: `${ServerUrl}/images/${oldPicture}`,
        bytes: "",
    })
      
       setBtnStatus(false)

    }

    const handleSaveImage=async()=>{
      let formData=new FormData()
      formData.append('productid',productId)
      formData.append('image',image.bytes)
      let result=await postData ('products/edit_product_image',formData)
      if(result.status){
        setLogoMessage(result.message)
      }
      else{
        setLogoMessage(result.message)
      }
      setBtnStatus(false)
      fetch_all_products()
    }

    const handleClose = () => {
        setDialog(false);
      };
    
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
   setBtnStatus(true)
  }
  
  const handleCompanyId=(event)=>{
   setCompanyId(event.target.value)
   fetchAllCategory(event.target.value)

  }

  
  const handleDeleteProduct=async(rowData)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await postData ('products/delete_product_data',{productid:rowData.productid})
        Swal.fire(
          'Deleted!',
          'Product Deleted Suceesfully',
          'success'
        )
      }
      fetch_all_products()
    })
    
   
   

  }

   const fetchAllCategory=async(companyid)=>{
     var body={'companyid':companyid}
     var result=await postData('products/fetch_all_categories',body)
     
     setCategories(result.data)
     fillCategories()
  
   }
   const handleClickOpen =(rowData) => {
    alert(JSON.stringify(rowData))
    fetchAllCategory(rowData.companyid)
    
    fillCategories()
    
    setCompanyName(rowData.companyname)
    setCompanyId(rowData.companyid)
    setOldPicture(rowData.image)
    setProductId(rowData.productid)
    setCategory(rowData.categoryid)
    setCategoryId(rowData.categoryid)
    setProduct(rowData.productname)
    setDescription(rowData.description)
    setStatus(rowData.status)
    setTrending(rowData.trending)
    setDeals(rowData.deals)
    setPriceType(rowData.pricetype)
    setImage({
        fileName: `${ServerUrl}/images/${rowData.image}`,
        bytes: "",
    })
    setDialog(true)
   
  };
   
   const fillCategories=()=>{
     return (
       categories.map((item)=>{
         return(
           <MenuItem value={item.categoryid}>{item.category}</MenuItem>
         )
       })
     )      
   }

   const PictureButton=()=>{
    return(
      <div style={{display:'flex',alignItems:'center',padding:5}}>
        <Button onClick={handleSaveImage}> Save</Button>
        <Button onClick={handleCancelImage}> Cancel</Button>

      </div>
    )
  }

   useEffect(function(){
  
    fetch_all_products(admin.companyid)
  },[])

   /*useEffect(function(){
      fetchAllCategory()
   },[companyId])
*/

const handleEditData = async () => {
    var cd=new Date()
    let dd=cd.getFullYear()+"/"+ (cd.getMonth()+1) +"/" +cd.getDate()+ "  " +cd.getHours()+":" + cd.getMinutes()
      let body={
      'categoryid':categoryId,
     'companyid':companyId,
     'productname':product,
      'description':description,
      'status':status,
      'trending':trending,
      'deals':deals,
     'pricetype':priceType,
      
      'createdat':dd,
      'updateat':dd,
      'createdby':"Admin",
      'productid':productId
      }
 
      var result= await postData('products/edit_product_data',body)
      if(result.status){
        setDialog(false)
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
    fetch_all_products();
  };
    

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
    function showAllProducts(){
        return(
           
          <MaterialTable
            title="Products Details"
            columns={[
                { title: 'Company', field: 'companyname' },
              { title: 'Category', field: 'category' },
              { title: 'Product', field: 'productname' },
              { title: 'Description', field: 'description'},
               {title:'Deals/Status',render:rowData=>(<div>{rowData.deals}<br/>{rowData.status}</div>)},
               { title: 'Trending', field: 'trending'},
               { title: 'Pricetype', field: 'pricetype'},
               {title:"Image",field:'image',render:rowData=>(<Avatar src={`${ServerUrl}/images/${rowData.image}`} style={{width:70,height:70}} variant="circle"/>)}
            ]}
            data={products}        
            actions={[
              {
                icon:'add',
                tooltip:'Add new Product',
                isFreeAction:true,
                onClick:(rowData,event)=>navigate('/dashboard/products')
              },
                {
                    icon: 'edit',
                    tooltip: 'Edit Product',
                    onClick:((event,rowData)=>handleClickOpen(rowData))
                  },
              {
                icon: 'delete',
                tooltip: 'Delete Product',
                onClick: (event, rowData) => handleDeleteProduct(rowData)
              }
            ]}
          />
         
        )
    }
    function openDialog(){  
      
    

      return(
        <div>
        <Dialog
            open={dialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            
            <DialogTitle id="alert-dialog-title" style={{display:'flex',justifyContent:'space-between'}}>
              <div>
                
                
              <img
                src="/assets/companylogo.png"
                width="35"
                style={{ marginRight: 6 }}
              />
              Edit Product
              </div>
              <div>
                 <CloseIcon onClick={handleClose} style={{cursor:'pointer'}}/>
              </div>
            </DialogTitle>
           
            
            <DialogContent>
      <Grid container spacing={2}  >
        
      <Grid item xs={6}>
                <TextField
                  value={companyId}
                  onChange={handleCompanyId}
                  fullWidth
                  disabled
                  variant="outlined"
                  label="Company Id"
                  style={{marginTop:6}}
                />
              </Grid>
              <Grid item xs={6}>
         
         <FormControl fullWidth style={{marginTop:'6px'}}>
           <InputLabel id="demo-simple-select-label">Category</InputLabel>
           <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={category}
             label="Category"
             
             onChange={handleCategoryChange}
           >
             <MenuItem value={'Choose category'}>---Choose Category---</MenuItem>
             {fillCategories()}
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
                <MenuItem value={"kg"} >kg</MenuItem>
                <MenuItem value={"leter"} >leter</MenuItem>
                <MenuItem value={"pcs"} >pcs</MenuItem>
                <MenuItem value={"ml"} >ml</MenuItem>
                <MenuItem value={"gram"} >gram</MenuItem>
                
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
             {btnStatus?<PictureButton/>:<div style={{padding:4,fontWeight:'bold',fontSize:22,color:'green'}}>{logoMessage}</div>}
          </Grid>
         
      </Grid>
      </DialogContent>
      <DialogActions>
              <Button onClick={handleEditData}>Edit</Button>
              <Button onClick={handleClose} autoFocus>
                Cancel
              </Button>
            </DialogActions>
      </Dialog>
      </div>
   
      )
      }
   
  
 
      return(
        <div className={classes.mainContainer}>
          <div className={classes.box}>   {showAllProducts()}</div>
          <div> {openDialog()}</div>
     
        </div>
    )
  }

