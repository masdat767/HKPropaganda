import React, { useState, useEffect, useRef } from "react"
import { withStyles } from "@material-ui/core/styles"
import { TextField, InputAdornment } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { Chip, Button } from "@material-ui/core"
import _ from "lodash"

import Downshift from "downshift"

import "./autocomplete.css"

const InputText = withStyles({
  root: {
    "& input + fieldset": {
      background: "white",
      borderRadius: 30,
      borderWidth: 1,
      zIndex: -1,
    },
  },
})(TextField)

const Autocomplete = ({ tagList, selectedChip, setSelectedChip, onSearch }) => {
  // Selected tags
  const [inputValue, setInputValue] = useState("")
  const searchBtnClassName = () => {
    return selectedChip.length > 0
      ? "auto-complete__search-btn auto-complete__search-btn--with-tag"
      : "auto-complete__search-btn"
  }

  const onUpdate = inputValue => {
    if (inputValue && inputValue.length > 0) {
    }
  }

  const onSelect = tag => {
    setSelectedChip(prevState => {
      if (!_.some(prevState, tag)) {
        return prevState.concat(tag)
      }
      return prevState
    })
    setInputValue("")
  }

  const onInputValueChange = input => {
    setInputValue(input)
  }

  const handleDelete = chipToDelete => () => {
    setSelectedChip(chips => chips.filter(chip => chip.id !== chipToDelete.id))
  }

  const handleSearch = () => {
    onSearch(inputValue)
  }

  const downshiftListJSX = ({
    isOpen,
    highlightedIndex,
    selectedItem,
    getMenuProps,
    getItemProps,
    inputValue,
  }) => {
    if (!isOpen || inputValue.length === 0) {
      return
    }
    const tagListJSX = tagList
      .filter(({ name }) =>
        _.includes(name.toLowerCase(), inputValue.toLowerCase())
      )
      .map((tag, index) => (
        <div
          className="autoComplete_ListCell"
          key={tag.id}
          {...getItemProps({
            key: tag.name,
            index,
            item: tag,
            style: {
              backgroundColor:
                highlightedIndex === index ? "#f0f0f0" : "#ffffff",
              fontWeight: selectedItem === tag ? "bold" : "normal",
            },
          })}
        >
          {tag.name}
        </div>
      ))

    return (
      <div className="autoComplete_ListWrapper">
        <div {...getMenuProps()} className="autoComplete_List">
          {tagListJSX}
        </div>
      </div>
    )
  }

  return (
    <Downshift
      onSelect={onSelect}
      onInputValueChange={onInputValueChange}
      inputValue={inputValue}
      itemToString={tag => _.get(tag, "name", "")}
    >
      {({ getInputProps, ...otherInputProps }) => (
        <div
          style={{
            width: `100%`,
            maxWidth: `992px`,
            position: "relative",
          }}
        >
          <InputText
            {...getInputProps()}
            style={{
              width: `100%`,
              border: `1px solid #A0A0A0`,
              borderRadius: `30px`,
              background: "white",
            }}
            placeholder="用標籤搵相關文宣，如黑警、831、721、高官護照"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Button
                    className={searchBtnClassName()}
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                    搵文宣
                  </Button>
                  {selectedChip.map(data => {
                    return (
                      <Chip
                        key={data.key}
                        label={data.name}
                        onDelete={handleDelete(data)}
                      />
                    )
                  })}
                </InputAdornment>
              ),
            }}
            margin="normal"
            variant="outlined"
          />
          {downshiftListJSX(otherInputProps)}
        </div>
      )}
    </Downshift>
  )
}

export default Autocomplete
