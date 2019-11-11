import React, { useState } from "react"
import PropTypes from "prop-types"
import _ from "lodash"

import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import Dialog from "@material-ui/core/Dialog"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"

import { Tag } from "."
import "./card.css"
import styles from "./card.module.css"

function SimpleDialog(props) {
  const { onClose, selectedValue, open, imgData } = props
  const [isImgLoading, setIsImgLoading] = useState(true)
  const { tags } = imgData
  const imgSrcOriginal = _.get(imgData, "main_file.path", "")
  const imgSrcForDisplay = `${imgSrcOriginal}&w=600&h=600&fit=inside`

  function handleClose() {
    onClose(selectedValue)
  }

  // function handleDownload() {
  //   let a = document.createElement("a")
  //   a.href = imgSrc
  //   a.download = imgSrc.split("/").pop()
  //   document.body.appendChild(a)
  //   a.click()
  //   document.body.removeChild(a)
  // }

  return (
    <Dialog
      className={`SimpleDialog ${styles.Dialog}`}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      {/* <DialogTitle
        id="simple-dialog-title"
      >
        Title:
      </DialogTitle> */}

      <DialogContent>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          style={{
            margin: "8px 0",
          }}
        >
          <a
            href={imgSrcOriginal}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "blink",
            }}
            download
          >
            <Button color="primary" size="large">
              下載
            </Button>
          </a>
        </Grid>

        <div className={styles.imageHolder}>
          {isImgLoading && <CircularProgress className={styles.progress} />}
          <img
            className={styles.imageDisplayCard}
            style={{ display: isImgLoading ? "none" : "block" }}
            src={imgSrcForDisplay}
            onLoad={() => {
              setIsImgLoading(false)
            }}
          />
        </div>

        {/* <Grid
          className={styles.tagsWrapper}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        > */}
        <div className={styles.tagsWrapper}>
          <span>標籤:</span>
          <div className={styles.tagsContainer}>
            {tags.map(({ id, name }) => (
              <Tag tagText={name} key={id} />
            ))}
          </div>
        </div>
        {/* </Grid> */}
      </DialogContent>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

/**
 * This component is the Card.
 * @param {string} className - class name
 * @param {string} CardUrl - The URL for Card landing page
 * @param {string} CardText - The Card text of frontend
 */

const Card = ({ className, CardUrl, CardText, imgData }) => {
  const [open, setOpen] = React.useState(false)
  const imgSrc = _.get(imgData, "main_file.path", "") + "&w=360"

  const handleClickOpen = () => {
    setOpen(true)
    document.body.style.overflowY = "hidden"
  }

  const handleClose = () => {
    setOpen(false)
    document.body.style.overflowY = "auto"
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        style={{
          width: `100%`,
          display: `block`,
        }}
      >
        <img
          src={imgSrc}
          style={{
            objectFit: `cover`,
            margin: `0`,
          }}
        />
      </Button>
      {open && (
        <SimpleDialog open={open} onClose={handleClose} imgData={imgData} />
      )}
    </>
  )
}

Card.defaultProps = {
  className: "",
  CardUrl: {},
  CardText: "",
  imgSrc: "placeholderImage",
}

Card.propTypes = {
  className: PropTypes.string,
  CardUrl: PropTypes.object,
  CardText: PropTypes.string,
  imgSrc: PropTypes.string,
}

export default Card
