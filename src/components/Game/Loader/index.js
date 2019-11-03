import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles(theme => ({
  progressContainer: {
    padding: "80px 0",
    left: "0",
    textAlign: "center",
    position: "absolute",
  },
  progress: {
    margin: theme.spacing(2),
  },
}))

const Loader = () => {
  const classes = useStyles()

  return (
    <Container className={classes.progressContainer}>
      <CircularProgress className={classes.progress} />
    </Container>
  )
}

export default Loader
