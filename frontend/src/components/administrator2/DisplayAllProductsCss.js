import { makeStyles } from "@mui/styles";
export const useStyles=makeStyles({
    mainContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        
        width:'100%',
        height:'100%'
        
       },
       box:{
           padding:20,
           marginLeft:10,
           background:'#fff',
           width:'99%',
           borderRadius:'10px',
           
       },
       headingStyle:{
           display:'flex',
           flexDirection:'row',
           alignItems:'center',
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