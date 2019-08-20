import React from "react"
import PropTypes from "prop-types"

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { blue } from '@material-ui/core/colors';

import { Image, Tag } from "../components"

import _ from "lodash"


const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, uuid, imgSrc } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  function handleListItemClick(value) {
    onClose(value);
  }

  function handleDownload() {
    let a = document.createElement('a')
    a.href = imgSrc
    a.download = imgSrc.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const tagData = [{
    "tagUrl": "abc",
    "tagText": "abc",
  },
  {
    "tagUrl": "222",
    "tagText": "222222222",
  },
  {
    "tagUrl": "five-elements",
    "tagText": "五大訴求",
  }];

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={`xl`}
      scroll={`body`}
    >
      <DialogTitle
        id="simple-dialog-title"
      >
        Title: { uuid }
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Button
            onClick={handleDownload}
          >Download</Button>
        </Grid>

        <div
          className="image-holder"
        >
          <Image
            imgSrc={imgSrc}
            style={{
              maxWidth: '700px',
              height: `auto`,
              margin: `0 auto`,
            }}
          />
        </div>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <div>
            Tags:
            {
              tagData &&
              tagData
              .map((item, idx) => <Tag key={idx} className="atag" tagUrl={item.tagUrl} tagText={item.tagText} />)
            }
          </div>
          <div>
            Share:
            <Button >Share</Button>
          </div>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

/**
 * This component is the Card.
 * @param {string} className - class name
 * @param {string} CardUrl - The URL for Card landing page
 * @param {string} CardText - The Card text of frontend
 */

const Card = ({ className, CardUrl, CardText, imgSrc }) => {


  const [open, setOpen] = React.useState(false);

  function handleClickOpen(e) {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        style={{
          width: `100%`,
          display: `block`,
        }}
      >
        <Image
          imgSrc={imgSrc}
          style={{
            height: `100%`,
          }}
        />
      </Button>
      <SimpleDialog open={open} onClose={handleClose} uuid={imgSrc} imgSrc={imgSrc} />
    </>
  )
}

Card.defaultProps = {
  className: "",
  CardUrl: "",
  CardText: "",
  imgSrc: "placeholderImage",
}

Card.propTypes = {
  className: PropTypes.string,
  CardUrl: PropTypes.string,
  CardText: PropTypes.string,
  imgSrc: PropTypes.string,
}

export default Card
