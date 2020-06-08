import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/index";


const useStyles = makeStyles((theme) => ({
    wrapper: {
      display: "flex", 
      flexDirection: "column", 
    },
    videoWrapper: {
      height: "300px",
      [theme.breakpoints.down('sm')]: {
        height: "200px",
      },
      [theme.breakpoints.down('xs')]: {
        height: "100px",
      },
    },
    video: {
      position: "absolute",
      padding: 0,
      width: "100%",
      zIndex: "-1",
    },
    firstContainer: {
      position: "relative",
      width: "100%",  
      padding: "40px 0 40px 0",
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor: "#f5f5f0"
    },
    firstContainerColumn: {
      display: "flex", 
      flexDirection: "column",
    },
    firstContainerHeader: {
      fontWeight: "bold", 
      fontSize: "40pt",
      [theme.breakpoints.down('sm')]: {
        fontSize: "30pt",
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "10pt",
      },
    },
    firstContainerText: {
      fontSize: "20pt",
      color: "grey",
      [theme.breakpoints.down('sm')]: {
        fontSize: "15pt",
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "5pt",
      },
    },
    secondContainer: {
      width: "100%", 
      display: "flex", 
      justifyContent: "center", 
      flexDirection: "row", 
      backgroundColor: "#666666",
    },
    secondContainerRow: {
      display: "flex", 
      justifyContent: "space-between",
      margin: "0 0 0 50px"
    },
    secondContainerRowFirstColumn: {
      display: "flex", 
      flexDirection: "column", 
      width: "40%", 
      margin: "6% 0 0 0"
    },
    secondContainerRowFirstColumnHeader: {
      fontWeight: "bold", 
      fontSize: "40pt",
      color: "white",
      [theme.breakpoints.down('sm')]: {
        fontSize: "30pt",
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "10pt",
      },
    },
    secondContainerRowFirstColumnText: {
      fontSize: "20pt",
      color: "#e6e6e6",
      [theme.breakpoints.down('sm')]: {
        fontSize: "15pt",
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "5pt",
      },
    },
    secondContainerRowSecondColumn: {
      display: "flex", 
      flexDirection: "column", 
      width: "40%", 
      margin: "6% 0 0 0",
    },
    secondContainerRowSecondColumnHeader: {
      fontWeight: "bold", 
      fontSize: "40pt",
      color: "white",
      [theme.breakpoints.down('sm')]: {
        fontSize: "30pt",
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "10pt",
      },
    },
    secondContainerRowSecondColumnImage: {
      width: "43%",
      padding: "0 0 40px 0"
    },
    thirdContainer: {
      width: "100%",  
      display: "flex", 
      justifyContent: "center",
      alignItems: "center", 
      backgroundColor: "#f5f5f0",
    },
    thirdContainerColumn: {
      display: "flex", 
      flexDirection: "column",
      padding: "40px 0 40px 0"
    },
    thirdContainerHeader: {
      fontWeight: "bold", 
      fontSize: "40pt",
      [theme.breakpoints.down('sm')]: {
        fontSize: "30pt",
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "10pt",
      },
    },
    thirdContainerText: {
      fontSize: "20pt", 
      color: "grey",
      [theme.breakpoints.down('sm')]: {
        fontSize: "15pt",
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "5pt",
      },
    },
    
}));

export default useStyles;