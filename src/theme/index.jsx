import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  
  overrides: {
    MuiButton: {
      label: {
        color: "rgba(255,255,255,.5)", 
        textDecoration: "none",
        fontWeight: "300", 
        fontFamily: "'Roboto',sans-serif", 
        fontSize: "1rem", 
        lineHeight: "1.5", 
        textTransform: "capitalize",
        '&:hover': {
          color: "rgba(255,255,255,.75)"
        }
      }
    },
    MuiDrawer: {
      paper: {
        backgroundColor: "#efffff"
      }
    },
    MuiGridListTileBar: {
      root: {
        position: "relative", 
        margin: "-48px 0 0 0", 
        cursor: "pointer"
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: 0
      }
    }
  }
})