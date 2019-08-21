import React, { useState, useEffect, useRef } from "react"
import { withStyles } from "@material-ui/core/styles"
import { TextField, InputAdornment } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { Chip, Button } from "@material-ui/core"

import Downshift from "downshift";

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

const Autocomplete = ({ style }) => {
  // Selected tags
  const [chipData, setChipData] = useState([]);

  // Autocomplete suggestions of tags
  const [items, setItems] = useState([]);

  async function onUpdate (inputValue) {
    if (inputValue && inputValue.length > 0) {
      const response = await fetch(
        `/${inputValue}.json`,
      )

      let result = {}

      try {
        result = await response.json();
      } catch (e) {
        // NOP
        return
      }
      setItems(result.tags);
    }
  }

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  const handleSearch = () => {
    let tagsKey = chipData.map((item) => item.key).join(',');
    let url = `/material?tags=${tagsKey}`
    console.log(`fetch: ${url}`);
  };

  return (
    <Downshift
      onSelect={selection => {
        let newChips = chipData.slice()
        newChips.push({
          key: selection.id,
          label: selection.text
        })
        setChipData(newChips)
      }}
      onInputValueChange={value => onUpdate(value)}
      itemToString={item => (item ? item.text : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
        <div
          style={{
            width: `50%`,
          }}
        >
          <InputText {...getInputProps()}
            style={{
              width: `100%`,
              borderWidth: `1`,
              borderStyle: `solid`,
              borderColor: `#A0A0A0`,
              borderRadius: `30px`,
              background: "white",
            }}
            placeholder="Search Hong Kong Protest Images and Video Here"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                  {
                    chipData.map(data => {
                      return (
                        <Chip
                          key={data.key}
                          label={data.label}
                          onDelete={handleDelete(data)}
                        />
                      );
                    })
                  }
                  <Button onClick={handleSearch}>
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
            margin="normal"
            variant="outlined"
          />
          <ul {...getMenuProps()}>
            {isOpen
              ? items && items
                  .filter(item => true || !inputValue || item.value.includes(inputValue))
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.id,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "black",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                    >
                      {item.text}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}

export default Autocomplete
