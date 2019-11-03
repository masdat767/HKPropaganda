import React, { useState, useRef } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import FormHelperText from "@material-ui/core/FormHelperText"
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

import { useOutsideClick } from "../../../customHooks/"

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  addBtn: {
    marginBottom: 4,
    width: 31,
    minWidth: "unset",
    padding: "2px 0",
  },
  box: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  list: {
    position: "absolute",
    background: "#f5f5f5",
    top: "50px",
    width: "220px",
    padding: 0,
    border: "1px solid #ccc",
    borderTop: "none",
    [theme.breakpoints.down("xs")]: {
      top: "48px",
    },
  },
  listItem: {
    height: "40px",
    paddingTop: 0,
    paddingBottom: 0,
    borderTop: "1px solid #ccc",
    "&:hover": {
      backgroundColor: "unset",
    },
  },
  listItemHighlight: {
    textDecoration: "none",
    backgroundColor: "#00000014",
    "&:hover": {
      backgroundColor: "#00000014",
    },
    [theme.breakpoints.down("xs")]: {
      backgroundColor: "unset",
      "&:hover": {
        backgroundColor: "unset",
      },
    },
  },
}))

const TagInput = ({
  customTag,
  setCustomTag,
  tagSuggestionList,
  errorMsg,
  onChange,
  onAddition,
}) => {
  const [shouldShowSuggestion, setShouldShowSuggestion] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const classes = useStyles({ errorMsg })
  const hasErrMsg = !!errorMsg
  const wrapperRef = useRef(null)

  const onOutsideClick = () => {
    setShouldShowSuggestion(false)
  }

  const handleInputKeyDown = event => {
    const numOfSuggestedItems = Math.min(5, tagSuggestionList.length)
    const eventMap = {
      Enter: () => onAddition(),
      ArrowUp: () => {
        const newIdx =
          highlightIdx - 1 < 0 ? numOfSuggestedItems - 1 : highlightIdx - 1

        event.preventDefault()
        setCustomTag(tagSuggestionList[newIdx].name)
        setHighlightIdx(newIdx)
      },
      ArrowDown: () => {
        const newIdx = (highlightIdx + 1) % numOfSuggestedItems

        event.preventDefault()
        setCustomTag(tagSuggestionList[newIdx].name)
        setHighlightIdx(newIdx)
      },
    }
    const fn = eventMap[event.key]

    if (fn) {
      fn()
    }
  }

  const handleInputChange = event => {
    setShouldShowSuggestion(true)
    onChange(event)
  }

  const renderTagSuggestionList = () => {
    if (customTag.trim() === "") {
      return null
    }

    return (
      <List className={classes.list}>
        {tagSuggestionList.slice(0, 5).map((tag, idx) => {
          const className =
            idx === highlightIdx
              ? `${classes.listItem} ${classes.listItemHighlight}`
              : classes.listItem

          return (
            <ListItem
              className={className}
              key={tag.id}
              button
              onClick={() => onAddition(tag.name)}
              onMouseEnter={() => setHighlightIdx(idx)}
            >
              <ListItemText primary={tag.name} />
            </ListItem>
          )
        })}
      </List>
    )
  }

  useOutsideClick(wrapperRef, onOutsideClick)

  return (
    <Box className={classes.box}>
      <FormControl
        className={classes.formControl}
        error={hasErrMsg}
        ref={wrapperRef}
      >
        <InputLabel htmlFor="additional-tags">Additional Tags...</InputLabel>
        <Input
          id="additional-tags"
          aria-describedby="additional-tags-error-text"
          value={customTag}
          onKeyDown={handleInputKeyDown}
          onChange={handleInputChange}
          onFocus={() => setShouldShowSuggestion(true)}
        />

        {shouldShowSuggestion && renderTagSuggestionList()}

        <FormHelperText id="additional-tags-error-text">
          {errorMsg}
        </FormHelperText>
      </FormControl>
      <Button
        className={classes.addBtn}
        variant="contained"
        color="primary"
        onClick={() => onAddition()}
      >
        <AddIcon />
      </Button>
    </Box>
  )
}

export default TagInput
