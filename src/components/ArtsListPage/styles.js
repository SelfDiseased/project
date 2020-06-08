import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/index";


const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    padding: "60px 0 0 0",
    [theme.breakpoints.down('xs')]: {
      padding: "25px 0 0 0",
    },
  },
  artsHeader: {
    [theme.breakpoints.down('sm')]: {
      fontSize: "15px",
      margin: "0 0 0 0"
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "15px",
      margin: "30px 0 0 0"
    },
  }
});

export default useStyles;