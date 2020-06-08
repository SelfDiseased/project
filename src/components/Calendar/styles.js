import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/index";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  calendar: {
    position: "absolute", 
    margin: "300px 0 0 0"
  }
}));


export default useStyles;