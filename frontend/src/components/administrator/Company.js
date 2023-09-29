import { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { companyStyles } from "./CompanyCss";
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../services/ServerServices";
import Swal from "sweetalert2"
export default function Company(props) {
  /* States............................................*/
  const [showPassword, setShowPassword] = useState(false);
  const [companyLogo, setCompanyLogo] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });
  const [state,setState]=useState("")
  const [city,setCity]=useState("")
  const [companyName,setCompanyName]=useState("")
  const [ownerName,setOwnerName]=useState("")
  const [emailAddress,setEmailAddress]=useState('')
  const [password,setPassword]=useState('')
  const [mobileNumber,setMobileNumber]=useState('')
  const [address,setAddress]=useState('')
  const [states,setStates]=useState([])
  const [cities,setCities]=useState([])
  const [error,setError]=useState({})

  /* Functions ...............................*/
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /* for validations*/
  const handleError=(input,value)=>{
    setError(prev=>({...prev,[input]:value}))

  }
  const validation=()=>{
   let  isValid=true;
    if(!companyName){
     handleError("companyName","Invalid Company Name")
     isValid=false
    }
    if(!ownerName){
      handleError('ownerName',"Invalid Owner Name")
      isValid=false
    }
    if(!mobileNumber || !(/^[0-9]{10}$/.test(mobileNumber)))
    {
      handleError('mobileNumber',"Invalid Mobile Number")
      isValid=false
    }
    if(!emailAddress || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress))){
      handleError('emailAddress',"Invalid Email Address")
      isValid=false
    }
    if(!address){
      handleError('address',"Invalid Address")
      isValid=false
    }
    if(!state || state=="---Select State---"){
      handleError('state',"Invalid State")
      isValid=false
    }
    if(!emailAddress){
      handleError('city',"Invalid City")
      isValid=false
    }
    if(!password){
      handleError('password',"Invalid password")
      isValid=false
    }
    return isValid
  }
  const handleImage = (event) => {
    setCompanyLogo({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const fetchAllStates=async()=>{
    var result=await getData('statecity/fetch_all_states')
     setStates(result.data)
  }

  const handleStateChange=(event)=>{
      setState(event.target.value)
      fetchAllCities(event.target.value)
  }

  const handleCityChange=(event)=>{
    setCity(event.target.value)
  }

  const fetchAllCities= async(stateid)=>{
    var body={'stateid':stateid}
    var result=await postData('statecity/fetch_all_cities',body)
    
    setCities(result.data)
    fillCities()

  }

  const handleSubmit=async()=>{
     if(validation()){
    var cd=new Date()
    let dd=cd.getFullYear()+"/"+ (cd.getMonth()+1) +"/" +cd.getDate()+ "  " +cd.getHours()+":" + cd.getMinutes()
    var formData=new FormData()
    formData.append('companyname',companyName)
    formData.append('ownername',ownerName)
    formData.append('emailaddress',emailAddress)
    formData.append('mobilenumber',mobileNumber)
    formData.append('address',address)
    formData.append('state',state)
    formData.append('city',city)
    formData.append('logo',companyLogo.bytes)
    formData.append('password',password)
    formData.append('status','Pending')
    formData.append('createdat',dd)
    formData.append('updateat',dd)
    formData.append('createdby',"Admin")

    var result= await postData('company/add_new_company',formData)
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
  }

  const fillCities=()=>{
    return cities.map((item)=>{
      return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
    })
  }

  useEffect(function(){
       fetchAllStates()
  },[])

  const fillStates=()=>{
    return states.map((item)=>{
      return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
    })
  }

  const handleReset=()=>{
    setCompanyName('')
    setOwnerName('')
    setEmailAddress('')
    setMobileNumber('')
    setAddress('')
    setState('')
    setCity('')
    setPassword('')
    setCompanyLogo({
      fileName: "/assets/watermark.png",
      bytes: "",
    });
  }

  /* Variables..............*/
  var classes = companyStyles();
  var navigate=useNavigate();
  /*************************** */
  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
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
              Company Registration
              </div>     
            
           
            <div >
              <ListIcon fontSize="large" style={{marginLeft:550,cursor:'pointer'}} onClick={()=>navigate('/displayallcompanies')}  />
            </div>
            
            
          </Grid>
          <Grid item xs={6}>
            <TextField onFocus={()=>handleError('companyName',null)} error={error.companyName?true:false} helperText={error.companyName} value={companyName} onChange={(event)=>setCompanyName(event.target.value)} fullWidth label="Company name" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField error={error.ownerName?true:false} helperText={error.ownerName} onFocus={()=>handleError('ownerName',null)} value={ownerName} onChange={(event)=>setOwnerName(event.target.value)} fullWidth label="Owner name" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField onFocus={()=>handleError('emailAddress',null)} error={error.emailAddress?true:false} helperText={error.emailAddress} value={emailAddress} onChange={(event)=>setEmailAddress(event.target.value)} fullWidth label="Email address" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField error={error.mobileNumber?true:false}  helperText={error.mobileNumber} onFocus={()=>handleError('mobileNumber',null)} value={mobileNumber} onChange={(event)=>setMobileNumber(event.target.value)} fullWidth label="Mobile number" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField  onFocus={()=>handleError('address',null)} error={error.address?true:false} helperText={error.address}  value={address} onChange={(event)=>setAddress(event.target.value)} fullWidth label="Address" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">State</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={state}
    label="State"
    onChange={handleStateChange}
    onFocus={()=>handleError('state',null)} error={error.state?true:false}  
  >
    <MenuItem value={"---Select State---"}>---Select State---</MenuItem>
    {fillStates()}
   
  </Select>
  <div style={{color:'red',padding:5,marginLeft:8,fontSize:12}}>{error.state?"Invalid State":''}</div>
</FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">City</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={city}
    label="City"
    onChange={handleCityChange}
    onFocus={()=>handleError('city',null)} error={error.city?true:false} helperText={error.city} 
  >
    <MenuItem value={"---Select City---"}>---Select City---</MenuItem>
    {fillCities()}
  </Select>
</FormControl>
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
              src={companyLogo.fileName}
              sx={{ width: 56, height: 56 }}
              variant="square"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                value={password}
                label="Password"
                onChange={(event)=>setPassword(event.target.value)}
                onFocus={()=>handleError('password',null)} error={error.password?true:false} helperText={error.password} 
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleSubmit} fullWidth type="submit" variant="outlined">Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth onClick={handleReset} type="reset" variant="outlined">Reset</Button>
          </Grid>
          <Grid>
            <div>
            
            </div>
            </Grid>
        </Grid>
      </div>
    </div>
  );
}
