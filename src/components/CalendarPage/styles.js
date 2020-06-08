import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/index";


const useStyles = makeStyles((theme) => ({
  calendar: {
    position: "absolute", 
    padding: "200px 0 0 0"
  },
  wrapper: {
    height: "100%"
  }
}));


export default useStyles;