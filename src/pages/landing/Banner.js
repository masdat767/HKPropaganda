import React, { useState, useEffect } from "react"
import { withStyles } from "@material-ui/core/styles"
import { InputAdornment, Typography } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

import Button from "@material-ui/core/Button"
// import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import SearchBar from "./SearchBar"

import { Image, Tag, Autocomplete } from "../../components"
import ToGameBtn from "../../components/Btn/ToGameBtn"
import some from "lodash/some"
import get from "lodash/get"

import styles from "./Banner.module.css"
import logo from "../../images/logo.svg"

const useStyles = makeStyles({
  yellowBtn: {
    background: "yellow",
    position: "absolute",
    right: "20px",
    top: "20px",
    "&:hover": {
      background: "#efef04",
    },
  },
})

// export default function Hook() {
//   const classes = useStyles();
//   return <Button className={classes.root}>Hook</Button>;
// }

const Banner = ({ tagList, updateSearch, picList }) => {
  const classes = useStyles()
  // const [searchInput, setSearchInput] = useState("")
  // const [selectedChip, setSelectedChip] = useState([])

  // // { tagList, updateSearch, picList }
  // // console.log(
  // //   "%c==== custom-log: props ====",
  // //   "background: teal; color: #ffff6d",
  // //   props
  // // )

  // console.log(
  //   "%c==== custom-log: input ====",
  //   "background: teal; color: #ffff6d",
  //   searchInput
  // )

  // const handleSearchInputChange = event => {
  //   setSearchInput(event.target.value)
  // }

  // return (
  //   <div className={styles.banner}>
  //     <Button className={classes.yellowBtn} variant="contained">
  //       多個文檔下載
  //     </Button>
  //     <img className={styles.banner__logo} src={logo} alt="logo" />
  //     <Typography variant="subtitle2" component="h3">
  //       可能係全港最大o既文宣Library
  //     </Typography>

  //     <SearchBar
  //       value={searchInput}
  //       onChange={handleSearchInputChange}
  //       tagList={tagList}
  //       selectedChip={selectedChip}
  //       setSelectedChip={setSelectedChip}
  //     />
  //   </div>
  // )

  // const [selectedChips, setSelectedChips] = useState([])
  const [randomBgSrc, setRandomBgSrc] = useState("")

  // const SearchBar = withStyles({
  //   root: {
  //     "& input + fieldset": {
  //       background: "white",
  //       borderRadius: 30,
  //       borderWidth: 1,
  //       zIndex: -1,
  //     },
  //   },
  // })(Autocomplete)

  const onSearch = (keyword, selectedChips) => {
    updateSearch({
      updateKeyword: keyword,
      updateTagList: selectedChips,
    })
  }

  // const tagListJSX = tagList
  //   .filter((a, index) => index < 8)
  //   .map(tag => {
  //     const { name } = tag
  //     const tagOnClick = () => {
  //       setSelectedChip(prevState => {
  //         if (!some(prevState, tag)) {
  //           return prevState.concat(tag)
  //         }
  //         return prevState
  //       })
  //     }

  //     return <Tag key={name} tagText={name} onClick={tagOnClick} />
  //   })

  const getRandomBgSrc = () => {
    const randomIdx = Math.floor(Math.random() * picList.length)
    const backgroundImgSrc = get(picList, `${randomIdx}.main_file.path`, "")

    setRandomBgSrc(backgroundImgSrc)
  }

  useEffect(getRandomBgSrc, [picList])

  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.header}>
        {/* <Button className={classes.yellowBtn} variant="contained">
          多個文檔下載
        </Button> */}
        <img className={styles.banner__logo} src={logo} alt="logo" />
        <Typography
          className={styles.banner__logoText}
          variant="subtitle2"
          component="h3"
        >
          可能係全港最大o既文宣Library
        </Typography>
      </div>

      <div
        style={{ backgroundImage: `url(${randomBgSrc})` }}
        className={styles.backdropBlur}
      />

      <div className={styles.banner__hero}>
        <SearchBar tagList={tagList} onSearch={onSearch} />

        <div className={styles.toGameBtnGroup}>
          <Typography variant="subtitle2" component="p">
            你知道嗎?
          </Typography>
          <Typography variant="subtitle2" component="p">
            每日平均有600張文宣出世, 每張文宣都要落tag先會喺度出現,
            快d幫手一齊落tag啦!
          </Typography>
          <ToGameBtn />
          {/* <Typography
            className={styles.copyrightText}
            variant="subtitle2"
            component="p"
          >
            了解更多有關文宣版權信息
          </Typography> */}
        </div>
      </div>
    </div>
  )
}

Banner.defaultProps = {
  tagList: [],
}

export default Banner
