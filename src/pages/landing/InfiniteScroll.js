import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import get from "lodash/get"
import debounce from "lodash/debounce"

import { CircularProgress } from "@material-ui/core"

import HorizotalList from "./HorizotalList"

const InfiniteScroll = ({ picList, updateScroll, hasMoreImage }, ref) => {
  const [firstList, setFirstList] = useState([])
  const [secondList, setSecondList] = useState([])
  const [thirdList, setThirdList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  const firstRef = useRef(null)
  const secondRef = useRef(null)
  const thirdRef = useRef(null)
  const infiniteRef = useRef(null)

  const mapping = [
    {
      label: "First",
      list: firstList,
      ref: firstRef,
    },
    {
      label: "Second",
      list: secondList,
      ref: secondRef,
    },
    {
      label: "Third",
      list: thirdList,
      ref: thirdRef,
    },
  ]

  const handleScroll = () => {
    const htmlTag = document.getElementsByTagName("html")[0]
    const infiniteHeight = get(infiniteRef, "current.scrollHeight", 0)
    const scrollHeight = htmlTag.scrollTop + htmlTag.clientHeight
    if (scrollHeight > infiniteHeight && !isLoading && hasMoreImage) {
      setLoading(true)
    }
  }

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth > 600)
  }

  const debouncedHandleResize = debounce(handleResize, 250)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", debouncedHandleResize)
    setIsLargeScreen(window.innerWidth > 600)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", debouncedHandleResize)
    }
  }, [])

  useEffect(() => {
    if (isLoading && updateScroll) {
      updateScroll()
    }
  }, [isLoading])

  useEffect(() => {
    setFirstList(picList.filter((text, index) => index % 3 === 0))
    setSecondList(picList.filter((text, index) => index % 3 === 1))
    setThirdList(picList.filter((text, index) => index % 3 === 2))
    setLoading(false)
  }, [picList])

  const renderProgress = () => {
    if (!hasMoreImage) {
      return (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "5px 12px",
            background: "#fafad2",
            textAlign: "center",
          }}
        >
          暫時冇更多文宣
        </div>
      )
    }

    if (isLoading) {
      return (
        <div
          style={{
            margin: "24px 0",
            textAlign: "center",
          }}
        >
          <CircularProgress />
        </div>
      )
    }

    return null
  }

  return (
    <>
      <div
        ref={infiniteRef}
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: isLargeScreen ? "repeat(3, 1fr)" : "auto",
          gridGap: 24,
        }}
      >
        {isLargeScreen ? (
          <React.Fragment>
            <HorizotalList ref={firstRef} picList={firstList} key="First" />
            <HorizotalList ref={secondRef} picList={secondList} key="Second" />
            <HorizotalList ref={thirdRef} picList={thirdList} key="Third" />
          </React.Fragment>
        ) : (
          <HorizotalList ref={firstRef} picList={picList} key="First" />
        )}
      </div>

      {renderProgress()}
    </>
  )
}

InfiniteScroll.propTypes = {
  picList: PropTypes.arrayOf(PropTypes.object),
  updateScroll: PropTypes.func,
}

InfiniteScroll.defaultProps = {
  picList: [],
  updateScroll: () => {},
}

export default InfiniteScroll
