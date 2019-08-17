import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import _ from "lodash"

import { CircularProgress } from '@material-ui/core'

import HorizotalList from "./HorizotalList"

const InfiniteScroll = ({ picList, updateScroll }, ref) => {
  const [firstList, setFirstList] = useState([])
  const [secondList, setSecondList] = useState([])
  const [thirdList, setThirdList] = useState([])
  const [isLoading, setLoading] = useState(false);
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
    const htmlTag = document.getElementsByTagName("html")[0];
    const infiniteHeight = _.get(infiniteRef, "current.scrollHeight", 0);
    const scrollHeight = htmlTag.scrollTop + htmlTag.clientHeight;
    if (scrollHeight > infiniteHeight && !isLoading) {
      setLoading(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isLoading && updateScroll) {
      updateScroll();
    }
  }, [isLoading])

  useEffect(() => {
    // const minItem = _.minBy(mapping, (mapItem) => {
    //     return _.get(mapItem, "ref.current.getHeight", () => {})();
    // });
    // console.log(minItem)
    setFirstList(picList.filter((text, index) => index % 3 === 0))
    setSecondList(picList.filter((text, index) => index % 3 === 1))
    setThirdList(picList.filter((text, index) => index % 3 === 2))
    setLoading(false);
  }, [picList])

  return (
    <>
    <div
      ref={infiniteRef}
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 24,
      }}
    >
      <HorizotalList ref={firstRef} picList={firstList} key="First"/>
      <HorizotalList ref={secondRef} picList={secondList} key="Second"/>
      <HorizotalList ref={thirdRef} picList={thirdList} key="Third"/>
    </div>
    {
      isLoading ? <div style={{
        margin: "24px 0",
        textAlign: "center"
      }}>
      <CircularProgress />
      </div> : null
    }
    </>
  )
}

InfiniteScroll.propTypes = {
  picList: PropTypes.arrayOf(PropTypes.string),
  updateScroll: PropTypes.func,
}

InfiniteScroll.defaultProps = {
  picList: [],
  updateScroll: () => {},
}

export default InfiniteScroll
