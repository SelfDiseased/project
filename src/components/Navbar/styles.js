import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/index";


const useStyles = makeStyles({
  wrapper: {
    position: "absolute",
    top: "0",
    width: "100%",
    zIndex: "100"
  },
  logo: {
    [theme.breakpoints.down('xs')]: {
      width: 20,
      height: 25,
      padding: "6px 0 0 0"
    },
  },
  hr: {
    backgroundColor: 'white',
    color: 'white',
    WebkitTransform: 'rotate(90deg)',
    width: "20px",
    height: "1px",
    border: "0",
    marginTop: "20px"
  },
  navLength: {
    display: "flex", 
    width: "100%",
    justifyContent: "space-between",
    zIndex: "100"
  },
  firstBlockOfThree: {
    display: "flex", 
    flexDirection: "row",
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      margin: 0,
      width: 260
    },
  },
  aboutLink: {
    display: "flex", 
    justifyContent: "end",
  },
  hideTerribleOrangeBorderInChrome: {
    '&:focus': {
      outline: "none !important",
    }
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "black"
  }
});


export default useStyles;