import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme => ({
  box: {
    margin: "16px",
    [theme.breakpoints.down("xs")]: {
      margin: "8px 0",
    },
  },
  contentBox: {
    display: "flex",
    margin: "16px 0",
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      flexDirection: "column",
    },
  },
  mediaContainer: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    position: "relative",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    margin: "20px",
    "& img": {
      width: "150px",
      marginRight: 30,
      marginBottom: 0,
    },
    "& h2": {
      marginBottom: 10,
    },
    "& p": {
      fontSize: "14px",
      marginBottom: 0,
    },
  },
  media: props => ({
    maxHeight: "80vh",
    width: "auto",
    margin: "0 auto",
    opacity: props.isImgLoading ? 0 : 1,
    [theme.breakpoints.down("xs")]: {
      height: "40vh",
    },
  }),
  tagContainer: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 30,
    [theme.breakpoints.down("xs")]: {
      height: "unset",
      marginTop: 0,
    },
  },
  tagBtnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "0 0 20px 0",
    [theme.breakpoints.down("xs")]: {
      margin: "8px 0",
    },
  },
  skipBtn: {
    marginRight: "20px",
    border: "1px solid #000",
    padding: "2px 8px",
    height: "30px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  nextBtnDisabled: {
    padding: "6px 30px",
    border: "2px solid transparent",
  },
  nextBtn: {
    fontWeight: "bold",
    backgroundColor: "#2d9312",
    border: "2px solid black",
    color: "black",
    padding: "6px 30px",
    "&:hover": {
      backgroundColor: "#24770e",
    },
  },
  tagFooterContainer: {
    margin: "0 5px",
  },
  typoRoot: {
    color: "#999",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem",
    },
  },
}))
