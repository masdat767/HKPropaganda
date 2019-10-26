import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import CloseRoundedIcon from "@material-ui/icons/CloseRounded"

const useStyle = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(1),
    marginLeft: 0,
    backgroundColor: "#1ca417",
    color: "white",
    "&:active": {
      backgroundColor: "#1ca417",
      color: "white",
    },
    "&:focus": {
      backgroundColor: "#1ca417",
      color: "white",
    },
  },
  closeIcon: {
    color: "white",
    "&:hover": {
      color: "#ddd",
    },
  },
}))

const TagChip = ({ children, onDelete }) => {
  const classes = useStyle()

  return (
    <Chip
      className={classes.chip}
      label={children}
      deleteIcon={
        <CloseRoundedIcon className={classes.closeIcon} fontSize="small" />
      }
      onDelete={onDelete}
    />
  )
}

export default TagChip
