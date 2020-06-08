import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/index";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
    imageSizing: {
      [theme.breakpoints.down('lg')]: {
        height: "92.4vh",
      },
    },
    bottomIndent: {
      marginBottom: "30px"
    }
});


export default useStyles;