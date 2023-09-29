import { makeStyles } from "@mui/styles";
export const companyStyles= makeStyles({
    mainContainer:{
     display:'flex',
     alignItems:'center',
     justifyContent:'center',
     background:"#dfe6e9",
     width:'100%',
     height:'100vh'
    },
    box:{
        padding:20,
        margin:20,
        background:'#fff',
        width:'900px',
        borderRadius:'10px'
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
        alignItems:'space-between',
        justifyContent:'space-between',
        marginRight:10

    }
})