import { makeStyles } from "@material-ui/styles"


const useGlobalCSS = makeStyles({
  "@global": {
    "body, html": {
      height: "100%"
    },
    "#root": {
      height: "100%",
    }
  },
})

export default useGlobalCSS