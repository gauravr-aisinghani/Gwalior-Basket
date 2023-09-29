import { makeStyles } from "@mui/styles";
export const useStyles=makeStyles({
    mainContainer:{
        display:'flex',
        
        width:'100%',
       height:"100vh"
       },
       box:{
           padding:20,
           marginLeft:20,
           background:'#fff',
           width:'40%',
           borderRadius:'10px'
       },
       headingStyle:{
           display:'flex',
           flexDirection:'row',
           alignItems:'center',
           justifyContent:'space-between',
           fontFamily:'poppins',
           fontWeight:'600',
           fontSize:22,
           letterSpacing:1,
       },
       rowStyle:{
           display:'flex',
           flexDirection:'row',
           alignItems:'center'
       }
})