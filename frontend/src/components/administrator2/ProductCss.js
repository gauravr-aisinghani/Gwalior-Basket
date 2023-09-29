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
           margin:20,
           background:'#fff',
           width:'850px',
           borderRadius:'10px'
       },
       headingStyle:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        fontWeight:'bold',
        fontSize:20,
        fontFamily:'poppins',
        letterSpacing:1
       },
       rowStyle:{
        display:'flex',
        flexDirection:'row',
        alignItems:'space-between',
        
        marginRight:10

    }
})