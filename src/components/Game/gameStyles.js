import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme => ({
  box: {
    margin: "16px",
    [theme.breakpoints.down("xs")]: {
      margin: "8px 0",
    },
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.25rem",
      marginBottom: 8,
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
    position: "relative",
  },
  media: props => ({
    maxHeight: "80vh",
    width: "auto",
    margin: "0 auto",
    opacity: props.isImgLoading ? "0" : "1",
    [theme.breakpoints.down("xs")]: {
      height: "40vh",
    },
  }),
  tagContainer: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "80vh",
    [theme.breakpoints.down("xs")]: {
      height: "unset",
    },
  },
  tagFooterContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
