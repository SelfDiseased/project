import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/index";

const useStyles = makeStyles((theme) => ({
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      flexDirection: "column",
    },
    header: {
      [theme.breakpoints.down('xs')]: {
        padding: "70px 0 0 0",
        fontSize: "16px"
      }
    },
    errMessage: {
      [theme.breakpoints.down('xs')]: {
        fontSize: "10px"
      }
    }
}));

export default useStyles;