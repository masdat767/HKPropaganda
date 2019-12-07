import React, { useState, useEffect } from "react"
import Typography from "@material-ui/core/Typography"
import get from "lodash/get"

import SearchBar from "./SearchBar"
import ToGameBtn from "../../components/Btn/ToGameBtn"

import styles from "./Banner.module.css"
import logo from "../../images/logo.svg"

const Banner = ({ tagList, updateSearch, picList }) => {
  const [randomBgSrc, setRandomBgSrc] = useState("")

  const onSearch = (keyword, selectedChips) => {
    updateSearch({
      updateKeyword: keyword,
      updateTagList: selectedChips,
    })
  }

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
          可能係全港最大嘅文宣Library
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
            你知道嗎？
          </Typography>
          <Typography variant="subtitle2" component="p">
            平均每天有 600 張文宣出世，每一張文宣都要落 Tag
            先知會喺度出現，快啲幫手一齊 Tag 啦！
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
