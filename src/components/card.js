import React from "react"
import PropTypes from "prop-types"

import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import Dialog from "@material-ui/core/Dialog"
import Grid from "@material-ui/core/Grid"
import { Tag } from "."

import _ from "lodash"

function SimpleDialog(props) {
  const { onClose, selectedValue, open, imgData } = props
  const { tags } = imgData
  const imgSrc = _.get(imgData, "main_file.path", "")

  function handleClose() {
    onClose(selectedValue)
  }

  function handleDownload() {
    let a = document.createElement("a")
    a.href = imgSrc
    a.download = imgSrc.split("/").pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={`xl`}
      scroll={`body`}
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
            href={imgSrc}
            target="_blank"
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

        <div
          className="image-holder"
          style={{
            display: "flex",
          }}
        >
          <img
            src={imgSrc}
            style={{
              margin: "auto",
              objectFit: `cover`,
            }}
          />
        </div>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{
            margin: "24px 0",
          }}
        >
          <div>
            <span> 標籤: </span>
            {tags.map(({ id, name }) => (
              <Tag tagText={name} key={id} />
            ))}
          </div>
          <div>
            {/* <Button variant="outlined" color="primary">
              分享
            </Button> */}
          </div>
        </Grid>
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
  const imgSrc = _.get(imgData, "main_file.path", "")

  function handleClickOpen(e) {
    setOpen(true)
  }

  const handleClose = value => {
    setOpen(false)
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
      {open ? (
        <SimpleDialog open={open} onClose={handleClose} imgData={imgData} />
      ) : null}
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
