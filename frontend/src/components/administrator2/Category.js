import { Grid,Paper,TextField, IconButton, Avatar, Button } from "@mui/material";
import { useState } from "react";
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from "react-router-dom";
import { useStyles } from "./CategoryCss";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Swal from "sweetalert2";
import { postData } from "../services/ServerServices";
export default function Category() {
  /* defining States */
  const [companyName, setCompanyName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });
 /* defining variable*/
 let classes=useStyles()
 let admin=JSON.parse(localStorage.getItem('ADMIN'))
let navigate=useNavigate()
 /* defininig functions */
 const handleImage=(event)=>{
    setIcon({
        fileName:URL.createObjectURL(event.target.files[0]),
        bytes:event.target.files[0]
    })
 }

 const handleSubmit=async()=>{
  var cd=new Date()
  let dd=cd.getFullYear()+ "/" + (cd.getMonth()+1) + "/" + cd.getDate() +"  " + cd.getHours() + ":" + cd.getMinutes()
    let formData= new FormData()
    formData.append('companyid',admin.companyid)
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
  return (
    <div className={classes.mainContainer}>
        <div>
          <Paper elevation={4}  className={classes.box} >
      <Grid container spacing={2}>
      <Grid item xs={12} className={classes.headingStyle}>
            
           <div style={{display:'flex',flexDirection:'row'}}>
              <img
                src="/assets/companylogo.png"
                width="35"
                style={{ marginRight: 6 }}
              />
              
               
              
            <div>
              Category Registration
              </div>     
              </div>
           
            <div>
              <ListIcon fontSize="large" style={{cursor:'pointer'}} onClick={()=>navigate('/dashboard/displayallcategory')}  />
            </div>
            
            
            
          </Grid>
        <Grid item xs={12}>
          <TextField
            label="Company Name"
            value={admin.companyname}
            disabled
            variant="outlined"
            fullWidth
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
        <Grid item xs={12} className={classes.rowStyle}>
            <div>
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
          </div>
          <div>
          <Avatar
            alt="Remy Sharp"
            src={icon.fileName}
            sx={{ width: 56, height: 56 }}
            variant="square"
          />
          </div>
        </Grid>
        <Grid item xs={12}>
            <Button onClick={handleSubmit} variant="outlined" fullWidth type='submit'>Submit</Button>
           

        </Grid>
        <Grid item xs={12}>
            <Button onClick={handleReset}  variant="outlined" fullWidth type='reset'>Reset</Button>
           

        </Grid>
      </Grid>
      </Paper>
      </div>
    </div>
  );
}
