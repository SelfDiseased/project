import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/index";


const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
  },
  table: {
    height: "100%",
    [theme.breakpoints.down('md')]: {
      minWidth: 500,
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 10,
    }
  },
  root: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  gridList: {
    display: "flex",
    [theme.breakpoints.up('sm')]: {
      width: "85%",
    },
    [theme.breakpoints.down('xl')]: {
      height: 670,
    },
    [theme.breakpoints.down('lg')]: {
      height: 446,
    },
    [theme.breakpoints.down('xs')]: {
      width: "70%",
      height: "80vh"
    },
  },
  gridImg: {
    height: "100%", 
    width: "100%",
    [theme.breakpoints.down('lg')]: {
      maxHeight: "450px",
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: 250,
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: 200
    },
  },
  LargeGridImg: {
    height: "100%",
    width: "100%",
  },
  largeGridList: {
    width: "80%",
  },
  input: {
    maxWidth: 100,
  },
  iconButton: {
    padding: 10,
    outline: "none !important"
  },
  hideTerribleOrangeBorderInChrome: {
    outline: "none !important",
  },
  linkColor: {
    color: "black"
  },
  footerRow: {
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center",
    [theme.breakpoints.up('xs')]: {
      float: "right",
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column", 
    },
  },
}));


export default useStyles;