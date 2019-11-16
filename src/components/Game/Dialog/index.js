import React, { useState, Fragment } from "react"
import { navigate } from "@reach/router"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

export default function CustomizedDialogs({ closeDialog, numOfTags }) {
  const [isQuitGame, setIsQuitGame] = useState(false)

  const renderTextContent = () => {
    if (isQuitGame) {
      return "Thank you for your contribution. See you next time!"
    } else {
      return `You have tagged ${numOfTags} images in a row, do you want to continue?`
    }
  }

  const renderButtonGroup = () => {
    if (isQuitGame) {
      return (
        <Button autoFocus onClick={() => navigate("/")} color="primary">
          Confirm
        </Button>
      )
    } else {
      return (
        <Fragment>
          <Button onClick={() => setIsQuitGame(true)} color="secondary">
            Next Time
          </Button>
          <Button autoFocus onClick={closeDialog} color="primary">
            Continue
          </Button>
        </Fragment>
      )
    }
  }

  return (
    <div>
      <Dialog
        onClose={closeDialog}
        aria-labelledby="game-continue-dialog"
        open={true}
      >
        <DialogTitle id="game-continue-dialog" onClose={closeDialog}>
          Info
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{renderTextContent()}</Typography>
        </DialogContent>
        <DialogActions>{renderButtonGroup()}</DialogActions>
      </Dialog>
    </div>
  )
}
