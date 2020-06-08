import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/index";


const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  gridImg: {
    display: "flex",
    justifySelf: "center",
    position: "relative",
    height: "87.4vh",
    cursor: "pointer",
    margin: "20px 0 0 0"
  },
  list: {
    width: "100%",
  },
  fullList: {
    width: 'auto',
    backgroundColor: "red"
  },
  drawer: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default useStyles;