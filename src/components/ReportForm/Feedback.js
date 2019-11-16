import React, { Fragment } from "react"
import Typography from "@material-ui/core/Typography"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"

import styles from "./Feedback.module.css"

const Feedback = ({ handleClose }) => {
  return (
    <Fragment>
      <DialogContent className={styles.Feedback}>
        <Typography>
          Thank you for submitting an report, we will look into the issue ASAP
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default Feedback
