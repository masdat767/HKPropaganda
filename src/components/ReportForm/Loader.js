import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import DialogContent from "@material-ui/core/DialogContent"

import styles from "./Loader.module.css"

const Loader = () => {
  return (
    <DialogContent className={styles.Loader}>
      <CircularProgress />
    </DialogContent>
  )
}

export default Loader
