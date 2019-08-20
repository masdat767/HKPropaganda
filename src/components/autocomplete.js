import React, { useState, useEffect, useRef } from "react"
import { withStyles } from "@material-ui/core/styles"
import { TextField, InputAdornment } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { ChipList } from "../components"

import Downshift from "downshift";


// const items = [
//   { value: "apple" },
//   { value: "pear" },
//   { value: "orange" },
//   { value: "grape" },
//   { value: "banana" }
// ];

// const chips = [
//   { key: 0, label: 'Angular' },
//   { key: 1, label: 'jQuery' },
//   { key: 4, label: 'Vue.js' },
// ];

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
  const [chipData0, setChipData0] = useState([{ key: 0, label: 'Angular' }]);
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

  return (
    <Downshift
      onSelect={selection => {
        let newChips = chipData0.slice()
        newChips.push({
          key: selection.id,
          label: selection.text
        })
        console.log(newChips)
        setChipData0(newChips)
        // alert(selection ? `You selected ${selection.text}` : "Selection Cleared")
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
                  <ChipList chips={chipData0} />
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
