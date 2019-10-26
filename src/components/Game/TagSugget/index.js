import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"

import TagChip from "./TagChip"
import TagInput from "./TagInput"

const useStyle = makeStyles(theme => ({
  card: {
    margin: "20px 0",
    padding: "15px 25px 0 25px",
    [theme.breakpoints.down("xs")]: {
      margin: "4px 0",
    },
  },
  box: {
    marginBottom: 15,
  },
}))

const TagSuggest = ({ additionalTagList, updateReference, dispatch }) => {
  const classes = useStyle()
  const [additionalTag, setAdditionalTag] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const removeTagFromList = tag => {
    dispatch({
      type: "REMOVE_CUSTOM_TAG",
      payload: { tag },
    })
  }

  const handleAdditionalTagChange = event => {
    setAdditionalTag(event.target.value)
  }

  const handleTagAddition = () => {
    const isEmpty = additionalTag.trim() === ""
    const hasDuplicate = additionalTagList.some(
      item => item.name === additionalTag
    )
    let newTagList = [...additionalTagList]
    let errMsg = ""

    if (isEmpty) {
      errMsg = "Tag Name Cannot Be Empty"
    } else if (hasDuplicate) {
      errMsg = "Duplicate Tag"
    } else {
      newTagList.push({ name: additionalTag })
      setAdditionalTag("")
    }

    setErrorMsg(errMsg)
    dispatch({
      type: "ADD_CUSTOM_TAG",
      payload: { additionalTagList: newTagList },
    })
  }

  const handleInputKeyPress = event => {
    if (event.key === "Enter") {
      handleTagAddition()
    }
  }

  const clearInput = () => {
    setAdditionalTag("")
  }

  const renderChips = () => {
    return additionalTagList.map(({ name }) => {
      return (
        <TagChip key={name} onDelete={() => removeTagFromList(name)}>
          {name}
        </TagChip>
      )
    })
  }

  useEffect(clearInput, [updateReference])

  return (
    <Card className={classes.card}>
      <Typography>Any suggested tags?</Typography>
      <TagInput
        additionalTag={additionalTag}
        errorMsg={errorMsg}
        onChange={handleAdditionalTagChange}
        onKeyPress={handleInputKeyPress}
        onAddition={handleTagAddition}
      />
      <Box className={classes.box}>{renderChips()}</Box>
    </Card>
  )
}

export default TagSuggest
