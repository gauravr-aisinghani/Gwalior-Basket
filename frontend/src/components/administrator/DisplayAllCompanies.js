import MaterialTable from "@material-table/core"
import { useEffect,useState } from "react"
import { ServerUrl, getData,postData } from "../services/ServerServices"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Swal from "sweetalert2";
import { Avatar,FormControlLabel,Switch,Grid,FormControl,InputLabel,Select,OutlinedInput,IconButton,InputAdornment,MenuItem,TextField,Button,Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from "./DisplayAllCompaniesCss"
import { useNavigate } from "react-router-dom";

export default function DispalyAllCompanies(props){
  /* defining Variable */
   let classes=useStyles()
   let navigate=useNavigate()
    /* defining States */
   
  const [companyLogo, setCompanyLogo] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });
    const [companies,setCompanies]= useState([])
    const [dialog,setDialog]=useState(false)
    const [state,setState]=useState("")
  const [city,setCity]=useState("")
  const [companyId,setCompanyId]=useState('')
  const [companyName,setCompanyName]=useState("")
  const [ownerName,setOwnerName]=useState("")
  const [emailAddress,setEmailAddress]=useState('')
  const [status,setStatus]=useState('')
  const [mobileNumber,setMobileNumber]=useState('')
  const [address,setAddress]=useState('')
  const [states,setStates]=useState([])
  const [cities,setCities]=useState([])
  const [btnStatus,setBtnStatus]=useState(false)
  const [oldPicture,setOldPicture]=useState('')
  const [logoMessage,setLogoMessage]=useState('')

     /*defining functions*/

     useEffect(function(){
        fetchAllCompanies()
     },[])

    const PictureButton=()=>{
      return(
        <div style={{display:'flex',alignItems:'center',padding:5}}>
          <Button onClick={handleSaveImage}> Save</Button>
          <Button onClick={handleCancelImage}> Cancel</Button>

        </div>
      )
    }

    const handleDeleteCompany=async(rowData)=>{
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
          let result = await postData ('company/delete_company_data',{companyid:rowData.companyid})
          Swal.fire(
            'Deleted!',
            'Company Deleted Suceesfully',
            'success'
          )
        }
        fetchAllCompanies()
      })
      
     
     

    }
    const handleCancelImage=()=>{
      setCompanyLogo({fileName:`${ServerUrl}/images/${oldPicture}`,bytes:''})
      
       setBtnStatus(false)

    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    
    const handleSaveImage=async()=>{
      let formData=new FormData()
      formData.append('companyid',companyId)
      formData.append('logo',companyLogo.bytes)
      let result=await postData ('company/edit_company_logo',formData)
      if(result.status){
        setLogoMessage(result.message)
      }
      else{
        setLogoMessage(result.message)
      }
      setBtnStatus(false)
      fetchAllCompanies()
    }

     const fillCities=()=>{
      return cities.map((item)=>{
        return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
      })
      
    }
  
    const handleImage = (event) => {
      setCompanyLogo({
        fileName: URL.createObjectURL(event.target.files[0]),
        bytes: event.target.files[0],
      });
      setBtnStatus(true)
     
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
    const handleEditData = async () => {
      var cd = new Date();
      var dd =
        cd.getFullYear() +
        "/" +
        (cd.getMonth() + 1) +
        "/" +
        cd.getDate() +
        " " +
        cd.getHours() +
        ":" +
        cd.getMinutes();
      var body = {
        companyid: companyId,
        ownername: ownerName,
        emailaddress: emailAddress,
        mobilenumber: mobileNumber,
        state: state,
        city: city,
        companyname: companyName,
        status: status,
        address: address,
        updateat: dd,
        createdby: "ADMIN",
      };
      var result = await postData("company/edit_company_data", body);
      if (result.status) {
        setDialog(false);
        Swal.fire({
          icon: "success",
          title: result.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
        });
      }
      fetchAllCompanies();
    };


    const fillStates=()=>{
      return states.map((item)=>{
        return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
      })
    }
  
     
     const fetchAllCompanies=async()=>{
           let result = await getData('company/fetch_all_company')
           
           setCompanies(result.data)           
     }
     
     const handleClickOpen = (rowData) => {
      fetchAllStates()
      fetchAllCities(rowData.state)
      setDialog(true);
     setCompanyId(rowData.companyid)
      setCompanyName(rowData.companyname)
    setOwnerName(rowData.ownername)
    setEmailAddress(rowData.emailaddress)
    setMobileNumber(rowData.mobilenumber)
    setAddress(rowData.address)
    setState(rowData.state)
    setCity(rowData.city)
    setOldPicture(rowData.logo)
    setStatus(rowData.status)
    setCompanyLogo({
      fileName: `${ServerUrl}/images/${rowData.logo}`,
      bytes: "",
    });
    };
  
    const handleClose = () => {
      setDialog(false);
    };
  
    function openDialog(){
      
      return (
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
              Edit Company
              </div>
              <div>
                 <CloseIcon onClick={handleClose} style={{cursor:'pointer'}}/>
              </div>
            </DialogTitle>
           
            
            <DialogContent>
            <Grid container spacing={2} style={{marginTop:5}}>
          
          <Grid item xs={6}>
            <TextField value={companyName} onChange={(event)=>setCompanyName(event.target.value)} fullWidth label="Company name" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField value={ownerName} onChange={(event)=>setOwnerName(event.target.value)} fullWidth label="Owner name" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField value={emailAddress} onChange={(event)=>setEmailAddress(event.target.value)} fullWidth label="Email address" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField value={mobileNumber} onChange={(event)=>setMobileNumber(event.target.value)} fullWidth label="Mobile number" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField value={address} onChange={(event)=>setAddress(event.target.value)} fullWidth label="Address" variant="outlined" />
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
  >
    <MenuItem value={"---Select State---"}>---Select State---</MenuItem>
    {fillStates()}
  </Select>
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
  >
    <MenuItem value={"---Select City---"}>---Select City---</MenuItem>
    {fillCities()}
  </Select>
</FormControl>
          </Grid>
          <Grid item xs={6} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <div style={{marginRight:6}}>Status:</div>
          {status=='Pending'?
          <FormControlLabel control={<Switch   />} label='Pending'onChange={()=>setStatus('Verified')}  />:
          <FormControlLabel control={<Switch defaultChecked />}  label='Verified' onChange={()=>setStatus('Pending')} />
           }

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
      );
    }

     
     
    function showAllComapnies() {
        return (
          <MaterialTable
            title="Company Details"
            columns={[
              { title: 'Company Name', field: 'companyname' },
              { title: 'Owner Name', field: 'ownername' },
              { title: 'Address',render:rowData=>(<div>{rowData.address}<br/>{rowData.cityname},{rowData.statename}</div>) },
              { title: 'Contact Information',render:rowData=>(<div>{rowData.emailaddress}<br/>{rowData.mobilenumber}</div>) },
              {title:'Staus',field:'status'},
              {title:"Logo",field:'logo',render:rowData=>(<Avatar src={`${ServerUrl}/images/${rowData.logo}`} style={{width:70,height:70}} variant="circle"/>)}
            ]}
            data={
                companies
            }        
            actions={[
              {
                icon:'add',
                tooltip:'Add new Company',
                isFreeAction:true,
                onClick:(rowData,event)=>navigate('/company')
              },
              {
                icon: 'edit',
                tooltip: 'Edit Company',
                onClick:((event,rowData)=>handleClickOpen(rowData))
              },
              {
                icon: 'delete',
                tooltip: 'Delete Company',
                onClick: ((event, rowData) => handleDeleteCompany(rowData))
              }
            ]}
          />
        )
      }
     
    return(
        <div className={classes.mainContainer}>
          <div className={classes.box}>   {showAllComapnies()}</div>
          <div> {openDialog()}</div>
     
        </div>
    )
}