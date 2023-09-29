import DisplayAllCategory from './DisplayAllCategory'
import DisplayAllProducts from './DisplayAllProducts';
import Category from './Category'
import Products from './Products'
import Banner from './Banner';
import ProductList from './ProductList'
import { Route,Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Stack from '@mui/material/Stack';
import {Toolbar,Grid,Paper,Box,List,ListItemButton,ListItemIcon,ListItemText,Divider} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LogoutIcon from '@mui/icons-material/Logout';
import { ServerUrl } from '../services/ServerServices';
import AdminLogin from './AdminLogin';


export default function Dashboard(props){
    /* defining variables */
    let navigate=useNavigate()
    let admin=JSON.parse(localStorage.getItem('ADMIN'))
    console.log(admin)
    /* ===================*/
/* defining States */
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [refresh,setRefresh]=React.useState(false)
/*------------------*/
/* defining function */
function appBarLabel(label) {
    return (
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {label}
        </Typography>
      </Toolbar>
    );
  }
  const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };

    const handleLogout=()=>{
      localStorage.clear()
      navigate('/adminlogin')
    }
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
  

    return(

        <div>
           <Grid container Spacing={0.1}  >
            <Grid item xs={12}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
       
        <AppBar position="static" color="primary">
          {appBarLabel('Dashboard')}
        </AppBar>
      </ThemeProvider>
    </Stack>

            </Grid>
            <Grid item xs={2.5}>
            <img src={`${ServerUrl}/images/${admin.logo}`} width="80" style={{margin:20}}/>
               <Paper elevation={4} style={{width:'80%',height:"60px",margin:20,background:'#f3f3f3',display:'flex',alignItems:'center',padding:'10px',boxSizing:'border-box'}}>
               <img src='/assets/user.webp' width="40"/>
                  <span style={{fontFamily:'poppins',fontWeight:'bold',fontSize:18,marginLeft:15}}>{admin.ownername}</span>
               </Paper>
               <div style={{margin:20}}>
               <Box sx={{ width: '90%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={() => navigate('/dashboard/displayallcategory')}
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItemButton>
        <ListItemButton
          
          onClick={() => navigate('/dashboard/displayallproducts')}
        >
          <ListItemIcon>
            <ProductionQuantityLimitsIcon/>
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={() => navigate('/dashboard/productlist')}
        >
          <ListItemIcon>
            <InsertLinkIcon/>
          </ListItemIcon>
          <ListItemText primary="List Product" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={() => navigate('/dashboard/banner')}
        >
          <ListItemIcon>
            <AddAPhotoIcon/>
          </ListItemIcon>
          <ListItemText primary="Add Banners" />
        </ListItemButton>
      
      <Divider />
      <ListItemButton
          selected={selectedIndex === 3}
          //onClick={() => navigate('/dashboard/adminlogin')}
        >
          <ListItemIcon>
            <LogoutIcon/>
          </ListItemIcon>
          <ListItemText primary="Logout" onClick={handleLogout} />
        </ListItemButton>
      </List>

      
    </Box>
               </div>

            </Grid>
            <Grid item xs={9.5}>
                <Routes>
            <Route element={<DisplayAllCategory/>} path={'/displayallcategory'}/>
            <Route element={<DisplayAllProducts/>} path={'/displayallproducts'} />
            <Route element={<Category/>} path={'/category'}/>
            <Route element={<Products/>} path={'/products'}/>
            <Route element={<ProductList/>} path={'/productlist'}/>
            <Route element={<Banner/>} path={'/banner'}/>
            </Routes>
            </Grid>
            </Grid>
            </div>

    )

}