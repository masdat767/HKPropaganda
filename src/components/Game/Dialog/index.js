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
      return `多謝你幫手tag圖，下次再見！`
    } else {
      return `玩左 ${numOfTags} 張，攰唔攰先？ 唔攰繼續黎，唔好比佢停！ 光復香港，時代革命！`
    }
  }

  const renderButtonGroup = () => {
    if (isQuitGame) {
      return (
        <Button autoFocus onClick={() => navigate("/")} color="primary">
          確定
        </Button>
      )
    } else {
      return (
        <Fragment>
          <Button onClick={() => setIsQuitGame(true)} color="secondary">
            下次再黎過
          </Button>
          <Button autoFocus onClick={closeDialog} color="primary">
            梗係繼續玩
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
          提示
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{renderTextContent()}</Typography>
        </DialogContent>
        <DialogActions>{renderButtonGroup()}</DialogActions>
      </Dialog>
    </div>
  )
}
