import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/index";


const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down('xs')]: {
      height: "200%",
    },
  }
}));


export default useStyles;