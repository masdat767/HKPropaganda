import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import { TextField, InputAdornment } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

import { Image, Tag, Autocomplete } from "../../components"
import _ from "lodash"

import styles from "./Banner.module.css"

const Banner = ({ tagList, updateSearch }) => {
  const [selectedChip, setSelectedChip] = useState([])
  const SearchBar = withStyles({
    root: {
      "& input + fieldset": {
        background: "white",
        borderRadius: 30,
        borderWidth: 1,
        zIndex: -1,
      },
    },
  })(Autocomplete)

  const onSearch = keyword => {
    updateSearch({
      updateKeyword: keyword,
      updateTagList: selectedChip,
    })
  }

  const tagListJSX = tagList
    .filter((a, index) => index < 8)
    .map(tag => {
      const { name } = tag
      const tagOnClick = () => {
        setSelectedChip(prevState => {
          if (!_.some(prevState, tag)) {
            return prevState.concat(tag)
          }
          return prevState
        })
      }

      return <Tag key={name} tagText={name} onClick={tagOnClick} />
    })

  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.banner}>
        <h1
          style={{
            textShadow: `0px 0px 4px black`,
          }}
          className={styles["header"]}
        >
          Hong Kong Protest Propaganda Library
        </h1>
        <div
          style={{
            textShadow: `0px 0px 4px black`,
          }}
        >
          搜羅所有文宣
        </div>
        <div
          style={{
            textShadow: `0px 0px 4px black`,
          }}
        >
          印出嚟貼爆連儂牆
        </div>

        <SearchBar
          placeholder="用標籤搵相關文宣，如黑警、831、721、高官護照"
          tagList={tagList}
          selectedChip={selectedChip}
          setSelectedChip={setSelectedChip}
          onSearch={onSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          margin="normal"
          variant="outlined"
        />

        <div
          style={{
            display: `flex`,
            width: `100%`,
            maxWidth: `992px`,
            textAlign: `left`,
            flexWrap: `wrap`,
            alignItems: `center`,
          }}
        >
          <span
            style={{
              paddingRight: `4px`,
              fontSize: `0.8rem`,
              textShadow: `1px 1px 2px #333`,
            }}
          >
            熱門字眼:
          </span>
          {tagListJSX}
        </div>
      </div>
      <div
        style={{
          height: `100%`,
          filter: `blur(4px) brightness(90%)`,
        }}
      >
        <Image
          imgSrc="propaganda2"
          style={{
            height: `100%`,
          }}
        />
      </div>
    </div>
  )
}

Banner.defaultProps = {
  tagList: [],
}

export default Banner
