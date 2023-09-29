import { Paper, Button, useMediaQuery,  } from "@mui/material";
import Badge from '@mui/material/Badge';
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { HashLink } from "react-router-hash-link";
import { useState } from "react";
import { useStyles } from "../css/HeaderCss";
import MenuIcon from '@mui/icons-material/Menu';
import HomePageDrawer from "./HomePageDrawer";
import { useLocation,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {

  /* defininin states */
  const [open,setOpen]=useState(false)
 
  /********************** */
  /* defining Variables */ //
  let products=useSelector((state)=>state.cart)
  let totalproducts=Object.keys(products)
  let navigate=useNavigate()
 
 
  let classes = useStyles();
  let location=useLocation()
  let matches = useMediaQuery("(min-width:470px)");

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const handleOpenDrawer=()=>{
    setOpen(true)
  }

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  /*-------------------*/

  const handleNavigate=()=>
  {
    navigate('/cart')
  }

  return (
    <div>
      <Paper
        style={{
          background: "#3C006B",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "60px",
          paddingLeft: matches ? 60 : 5,
          paddingRight:matches?40:5,
        }}
      >
        <img
          src="/assets/zepto.png"
          width="120"
          style={{ marginRight: matches ? 5 : 15 }}
        />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
         
          />
        </Search>
        <div
          style={{
           
              marginLeft: "auto",
              width:matches?'8%':'150%',
              display:'flex',
              justifyContent:'space-between',
              
           
          }}
        >
          <span ><Badge badgeContent={totalproducts.length} color="secondary">
         <ShoppingCartIcon onClick={handleNavigate} sx={{color:'white',cursor:'pointer',fontSize:matches?'32px':'24px'}}/></Badge></span>
         <PersonIcon sx={{color:'white',cursor:'pointer',fontSize:matches?'32px':'24px'}}/>
        {matches?<></>:<MenuIcon onClick={handleOpenDrawer}  sx={{color:'white',cursor:'pointer',fontSize:'24px'}} />}     
          
        

        </div>
      </Paper>
      {location.pathname=='/home'?
      <Paper style={{ display:'flex',        
        flexDirection:'row',
        alignItems:'center',
        background:'white',
        width:'100%',
        height:'70px',
        paddingLeft:matches?60:5,
        
        }}>
        <div sx={{width: matches?"20%":'100%'}}>
          <Button style={{color:"#3C006B"}} ><HashLink to='#category' smooth style={{textDecoration:'none'}}>Category</HashLink></Button>
          <Button sx={{ color: "#3C006B" }}>Deals</Button>
          
          <Button sx={{ color: "#3C006B" }}>Favourite Picks</Button>
          <Button sx={{ color: "#3C006B" }}>Trending</Button>
        </div>
      </Paper>:<></>}
      <HomePageDrawer open={open} setOpen={setOpen}/>
    </div>
   
   
  );
}
