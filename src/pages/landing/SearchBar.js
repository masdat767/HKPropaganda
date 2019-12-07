import React, { useState, useRef } from "react"
import SearchIcon from "@material-ui/icons/Search"
import Chip from "@material-ui/core/Chip"

import { normalizeStr } from "../../utils/helpers"
import styles from "./SearchBar.module.css"
import useOutsideClick from "../../customHooks/useOutsideClick"

const SearchBar = ({
  placeholder = "輸入標籤搵相關文宣",
  tagList = [],
  onSearch,
}) => {
  const [selectedChips, setSelectedChips] = useState([])
  const [shouldShowSuggestion, setShouldShowSuggestion] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const wrapperRef = useRef(null)

  const selectedChipSet = selectedChips.reduce((set, chip) => {
    set[normalizeStr(chip.name)] = true

    return set
  }, {})
  const availableTags = tagList.filter(
    tag => !selectedChipSet[normalizeStr(tag.name)]
  )

  const addChip = chip => {
    if (selectedChips.find(sChip => sChip.id === chip.id)) {
      return
    }

    setSelectedChips(selectedChips.concat(chip))
  }

  const tagSuggestionList = availableTags
    .filter(tag => tag.name.includes(normalizeStr(inputValue)))
    .slice(0, 5)

  const removeChip = chipId => {
    const newSelectedChips = selectedChips.filter(chip => chip.id !== chipId)

    setSelectedChips(newSelectedChips)
  }

  const handleInputChange = event => {
    const value = event.target.value

    setShouldShowSuggestion(!!value)
    setInputValue(value)
  }

  const handleSuggestionTagClick = tag => {
    addChip(tag)
    setInputValue("")
  }

  const handleInputKeyDown = event => {
    const numOfSuggestedItems = Math.min(5, tagSuggestionList.length)
    const eventMap = {
      Enter: () => {
        if (tagSuggestionList.length > 0 && shouldShowSuggestion) {
          setInputValue("")
          setShouldShowSuggestion(false)
          addChip(tagSuggestionList[highlightIdx])
        }
      },
      ArrowUp: () => {
        const newIdx =
          highlightIdx - 1 < 0 ? numOfSuggestedItems - 1 : highlightIdx - 1

        event.preventDefault()
        setHighlightIdx(newIdx)
      },
      ArrowDown: () => {
        const newIdx = (highlightIdx + 1) % numOfSuggestedItems

        event.preventDefault()
        setHighlightIdx(newIdx)
      },
    }
    const fn = eventMap[event.key]

    if (fn) {
      fn()
    }
  }

  const onOutsideClick = () => {
    setShouldShowSuggestion(false)
  }

  const renderSuggestions = () => {
    const normInput = normalizeStr(inputValue)

    if (normInput === "" || !shouldShowSuggestion) {
      return null
    }

    return (
      <div className={styles.suggestions}>
        {tagSuggestionList.map((tag, idx) => {
          const className =
            idx === highlightIdx
              ? styles.suggestion + " " + styles.suggestionHighlight
              : styles.suggestion

          return (
            <div
              className={className}
              key={tag.id}
              onClick={() => handleSuggestionTagClick(tag)}
            >
              {tag.name}
            </div>
          )
        })}
      </div>
    )
  }

  const searchBtnClassName =
    selectedChips.length > 0
      ? styles.searchBtn + " " + styles.searchBtnReady
      : styles.searchBtn

  useOutsideClick(wrapperRef, onOutsideClick)

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBox}>
        <div className={styles.selectedChips}>
          {selectedChips.map(chip => (
            <Chip
              className={styles.selectedChip}
              key={chip.id}
              label={chip.name}
              onDelete={() => removeChip(chip.id)}
            />
          ))}
        </div>

        <div className={styles.searchInputWrapper} ref={wrapperRef}>
          <input
            className={styles.searchInput}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <button
            className={searchBtnClassName}
            onClick={() => onSearch(inputValue, selectedChips)}
          >
            <SearchIcon />
            揾文宣
          </button>

          {renderSuggestions()}
        </div>
      </div>

      <div className={styles.hotTagWrapper}>
        <div className={styles.hotTagText}>熱門字眼:</div>
        <div className={styles.hotTagChipWrapper}>
          {availableTags.slice(0, 5).map(tag => {
            return (
              <Chip
                className={styles.hotTag}
                key={tag.id}
                label={tag.name}
                onClick={() => addChip(tag)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchBar
