import { Avatar,Dialog,DialogContent,IconButton,DialogTitle,DialogActions,Grid,Paper,TextField,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ServerUrl, getData,postData } from "../services/ServerServices";
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Swal from "sweetalert2";
import ListIcon from '@mui/icons-material/List';
import { useStyles } from "./DisplayAllCategoryCss";
import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
export default function DisplayAllCategory() {

   /* variables */
   let navigate=useNavigate()
   let admin=JSON.parse(localStorage.getItem('ADMIN'))
  /*defining states */
  const [categories, setCategories] = useState([]);
  const [dialog,setDialog]=useState(false)
  const [categoryId,setCategoryId]=useState()
  const [companyName, setCompanyName] = useState("");
  const [oldPicture,setOldPicture]=useState('')
  const [companyId,setCompanyId]=useState(admin.companyid)
  const [logoMessage,setLogoMessage]=useState('')
  const [btnStatus,setBtnStatus]=useState(false)
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });
  /*-----------------*/
 
  /* defining Functions */
  const handleClickOpen = (rowData) => {
   setCategoryName(rowData.category)
   setCategoryId(rowData.categoryid)
   setDescription(rowData.description)
    setDialog(true)
    setIcon({
      fileName: `${ServerUrl}/images/${rowData.icon}`,
      bytes: "",
  })
  };

 

 const handleSubmit=async()=>{
  var cd=new Date()
  let dd=cd.getFullYear()+ "/" + (cd.getMonth()+1) + "/" + cd.getDate() +"  " + cd.getHours() + ":" + cd.getMinutes()
    let formData= new FormData()
    formData.append('companyid',companyName)
    formData.append('category',categoryName)
    formData.append('description',description)
    formData.append('icon',icon.bytes)
    formData.append('createdat',dd)
    formData.append('updateat',dd)
    formData.append('createdby',dd)
    
    let result=await postData('category/add_new_category',formData)
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
  setCompanyName('')
  setCategoryName('')
  setDescription('')
  setIcon({
    fileName:'/assets/watermark.png',
    bytes:''
  })
 }

  const handleClose = () => {
    setDialog(false);
  };

  const handleEdit = async () => {
    var cd=new Date()
    let dd=cd.getFullYear()+"/"+ (cd.getMonth()+1) +"/" +cd.getDate()+ "  " +cd.getHours()+":" + cd.getMinutes()
      let body={
      
     'companyid':admin.companyid,
     'category':categoryName,     
      'description':description,     
      'createdat':dd,
      'updateat':dd,
      'createdby':"Admin",
      'categoryid':categoryId,
      }
 
      var result= await postData('category/edit_category_data',body)
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
    fetchAllCategory();
  };

  const handleDeleteCategory=async(rowData)=>{
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
        let result = await postData ('category/delete_category_data',{categoryid:rowData.categoryid})
        Swal.fire(
          'Deleted!',
          'Category Deleted Suceesfully',
          'success'
        )
      }
      fetchAllCategory()
    })
    
   
   

  }

  const handleSaveImage=async()=>{
    let formData=new FormData()
    formData.append('categoryid',categoryId)
    formData.append('icon',icon.bytes)
    let result=await postData ('category/edit_category_image',formData)
    if(result.status){
      setLogoMessage(result.message)
    }
    else{
      setLogoMessage(result.message)
    }
    setBtnStatus(false)
    fetchAllCategory()
  }

  
  const handleCancelImage=()=>{
    setIcon({
      fileName: `${ServerUrl}/images/${oldPicture}`,
      bytes: "",
  })
    
     setBtnStatus(false)

  }

  const PictureButton=()=>{
    return(
      <div style={{display:'flex',alignItems:'center',padding:5}}>
        <Button onClick={handleSaveImage}> Save</Button>
        <Button onClick={handleCancelImage}> Cancel</Button>

      </div>
    )
  }
    


  let showAllCategory = () => {
    return (
      <MaterialTable
        title="Category Details"
        columns={[
          { title: "Company Name", field: "companyname" },
          { title: "Category", field: "category" },
          {title:"Description",field:'description'},
          {title:'Icon',render:rowData=>(<Avatar variant='square' src={`${ServerUrl}/images/${rowData.icon}`} style={{width:60,height:60}}/>)}
          
        ]}
        data={categories}
        actions={[
          {
            icon:'add',
            tooltip:'Add new Category',
            isFreeAction:true,
            onClick:(rowData,event)=>navigate('/dashboard/category')
          },
          {
            icon: "edit",
            tooltip: "Edit Category",
            onClick:((event,rowData)=>handleClickOpen(rowData))
          },
          {
            icon: 'delete',
                tooltip: 'Delete Category',
                onClick: (event, rowData) => handleDeleteCategory(rowData)
          },
        ]}
      />
    );
  };

  const fetchAllCategory = async (companyid) => {
   
    let body={companyid:companyid}
    
    var result = await postData("category/fetch_all_category",body);
    setCategories(result.data);
  };

  const handleImage=(event)=>{
    setIcon({
      fileName:URL.createObjectURL(event.target.files[0]),
      bytes:event.target.files[0]
    })
    setBtnStatus(true)
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
            Edit Category
            </div>
            <div>
               <CloseIcon onClick={handleClose} style={{cursor:'pointer'}}/>
            </div>
          </DialogTitle>
         
          
          <DialogContent>
       <div>
          
      <Grid container spacing={2}>
      
        <Grid item xs={12}>
          <TextField
            label="Company Name"
            value={admin.companyname}
            disabled
            variant="outlined"
            fullWidth
            style={{marginTop:6}}
            onChange={(event)=>setCompanyName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Category Name"
            value={categoryName}
            variant="outlined"
            fullWidth
            onChange={(event)=>setCategoryName(event.target.value)}
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
              src={icon.fileName}
              sx={{ width: 56, height: 56 }}
              variant="square"
            />
             {btnStatus?<PictureButton/>:<div style={{padding:4,fontWeight:'bold',fontSize:22,color:'green'}}>{logoMessage}</div>}
          </Grid>
     
      </Grid>
     
      </div>
    </DialogContent>
    <DialogActions>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
    </Dialog>
    </div>
 
    )
    }

  useEffect(function(){
   
   fetchAllCategory(admin.companyid)
  },[])
  /* defining Variables */
  let classes = useStyles();
  return (
    
      <div className={classes.mainContainer}>
        <div className={classes.box}> {showAllCategory()}</div>
        <div> {openDialog()}</div>
      </div>
    
  );
}
