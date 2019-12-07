import React, { useState } from "react"
import PropTypes from "prop-types"
import get from "lodash/get"

// import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
// import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import Dialog from "@material-ui/core/Dialog"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import Box from "@material-ui/core/Box"
import Tooltip from "@material-ui/core/Tooltip"
import FlagIcon from "@material-ui/icons/Flag"
import ShareIcon from "@material-ui/icons/Share"
import DownloadIcon from "@material-ui/icons/GetApp"

import ReportForm from "./ReportForm"
import { Tag } from "./"

import "./card.css"
import styles from "./card.module.css"

function SimpleDialog(props) {
  const { onClose, selectedValue, open, imgData, setIsReportFormOpen } = props
  const [isImgLoading, setIsImgLoading] = useState(true)
  const { tags } = imgData
  const imgSrcOriginal = get(imgData, "main_file.path", "")
  const imgSrcForDisplay = `${imgSrcOriginal}&w=600&h=600&fit=inside`

  function handleClose() {
    onClose(selectedValue)
  }

  const reportImage = () => {
    onClose()
    setIsReportFormOpen(true)
  }

  const handleShareImage = event => {
    event.stopPropagation()

    if (navigator.share) {
      navigator
        .share({
          url: imgSrcOriginal,
        })
        .catch(console.error)
    }
  }

  return (
    <Dialog
      className={`SimpleDialog ${styles.Dialog}`}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
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
            style={{ display: "flex" }}
            download
            onClick={event => event.stopPropagation()}
          >
            <DownloadIcon className={styles.downloadIcon} />
          </a>
          <Tooltip
            title="提出問題"
            aria-label="report"
            placement="top"
            style={{ display: "flex" }}
          >
            <Box className={styles.reportWrapper} onClick={reportImage}>
              <FlagIcon className={styles.flagIcon} />
            </Box>
          </Tooltip>

          {navigator.share && (
            <ShareIcon
              className={styles.shareIcon}
              onClick={handleShareImage}
            />
          )}
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

        <div className={styles.tagsWrapper}>
          <span>標籤:</span>
          <div className={styles.tagsContainer}>
            {tags.map(({ id, name }) => (
              <Tag tagText={name} key={id} />
            ))}
          </div>
        </div>
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
  const [open, setOpen] = useState(false)
  const [isReportFormOpen, setIsReportFormOpen] = useState(false)
  const [shouldShowImageInfo, setShouldShowImageInfo] = useState(false)
  const imgSrc = get(imgData, "main_file.path", "") + "&w=360"
  const imgSrcOriginal = get(imgData, "main_file.path", "")

  const handleClickOpen = () => {
    setOpen(true)
    setShouldShowImageInfo(false)
    document.body.style.overflowY = "hidden"
  }

  const handleClose = () => {
    setOpen(false)
    document.body.style.overflowY = "auto"
  }

  const handleImageMouseEnter = () => {
    setShouldShowImageInfo(true)
  }

  const handleImageMouseLeave = () => {
    setShouldShowImageInfo(false)
  }

  const handleShareImage = event => {
    event.stopPropagation()

    if (navigator.share) {
      navigator
        .share({
          url: imgSrcOriginal,
        })
        .catch(console.error)
    }
  }

  return (
    <div
      onMouseEnter={handleImageMouseEnter}
      onMouseLeave={handleImageMouseLeave}
    >
      <Button
        onClick={handleClickOpen}
        style={{
          width: `100%`,
          display: `block`,
          position: "relative",
        }}
      >
        <img
          className={shouldShowImageInfo ? styles.imageDisplay : ""}
          src={imgSrc}
          style={{
            objectFit: `cover`,
            margin: `0`,
            borderRadius: "8px",
          }}
        />

        {shouldShowImageInfo && (
          <div className={styles.imageInfo}>
            <div className={styles.imageInfo__tags}>
              <p className={styles.imageInfo__title}>相關標籤:</p>
              <ul className={styles.imageInfo__tagList}>
                {imgData.tags.map(tag => {
                  return (
                    <li className={styles.imageInfo__tag} key={tag.id}>
                      {tag.name}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className={styles.imageInfo__actionIcons}>
              <div className={styles.imageInfo__actionsIconsBg}>
                <a
                  href={imgSrcOriginal}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "blink",
                    display: "flex",
                  }}
                  download
                  onClick={event => event.stopPropagation()}
                >
                  <DownloadIcon className={styles.downloadIcon} />
                </a>
                {navigator.share && (
                  <ShareIcon
                    className={styles.shareIcon}
                    onClick={handleShareImage}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </Button>

      {open && (
        <SimpleDialog
          open={open}
          onClose={handleClose}
          imgData={imgData}
          setIsReportFormOpen={setIsReportFormOpen}
        />
      )}

      {isReportFormOpen && (
        <ReportForm
          setIsReportFormOpen={setIsReportFormOpen}
          imageSrc={imgSrc}
          imageId={imgData.id}
          tags={imgData.tags}
        />
      )}
    </div>
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
