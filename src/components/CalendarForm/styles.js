import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/index";


const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: "60px 0 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    [theme.breakpoints.down('xs')]: {
      height: "200%",
    },
  },
  form: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  inputField: {
    padding: "0 0 10px 0",
  },
  submitBtn: {
    outline: "none !important"
  }
}));


export default useStyles;