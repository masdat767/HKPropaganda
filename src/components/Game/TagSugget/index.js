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
    overflow: "visible",
    [theme.breakpoints.down("xs")]: {
      margin: "4px 0",
    },
  },
  box: {
    marginBottom: 15,
  },
}))

const TagSuggest = ({
  customTagList,
  updateReference,
  existingTagList,
  dispatch,
}) => {
  const classes = useStyle()
  const [customTag, setCustomTag] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [tagSuggestionList, setTagSuggestionList] = useState([])

  const removeTagFromList = tag => {
    dispatch({
      type: "REMOVE_CUSTOM_TAG",
      payload: { tag },
    })
  }

  const handleAdditionalTagChange = event => {
    const { value } = event.target
    const matchedTags = existingTagList.filter(tag => {
      return (
        tag.name
          .toLowerCase()
          .trim()
          .includes(value) &&
        customTagList.every(
          customTag =>
            customTag.name.toLowerCase().trim() !==
            tag.name.toLowerCase().trim()
        )
      )
    })

    setTagSuggestionList(matchedTags)
    setCustomTag(event.target.value)
  }

  const handleTagAddition = value => {
    const tag = value === undefined ? customTag : value
    const isEmpty = tag.trim() === ""
    const hasDuplicate = customTagList.some(
      item => item.name.toLowerCase().trim() === tag.toLowerCase().trim()
    )
    let newTagList = [...customTagList]
    let errMsg = ""

    if (isEmpty) {
      errMsg = "Tag Name Cannot Be Empty"
    } else if (hasDuplicate) {
      errMsg = "Duplicate Tag"
    } else {
      newTagList.push({ name: tag })
      setCustomTag("")
    }

    setErrorMsg(errMsg)
    dispatch({
      type: "ADD_CUSTOM_TAG",
      payload: { customTagList: newTagList },
    })
  }

  const clearInput = () => {
    setCustomTag("")
  }

  const renderChips = () => {
    return customTagList.map(({ name }) => {
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
        customTag={customTag}
        setCustomTag={setCustomTag}
        tagSuggestionList={tagSuggestionList}
        errorMsg={errorMsg}
        onChange={handleAdditionalTagChange}
        onAddition={handleTagAddition}
      />
      <Box className={classes.box}>{renderChips()}</Box>
    </Card>
  )
}

export default TagSuggest
