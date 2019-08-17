import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import _ from "lodash"

import HorizotalList from "./HorizotalList"

const InfiniteScroll = ({ picList }, ref) => {
  const [firstList, setFirstList] = useState([])
  const [secondList, setSecondList] = useState([])
  const [thirdList, setThirdList] = useState([])
  const firstRef = useRef(null)
  const secondRef = useRef(null)
  const thirdRef = useRef(null)

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

  useEffect(() => {
    // const minItem = _.minBy(mapping, (mapItem) => {
    //     return _.get(mapItem, "ref.current.getHeight", () => {})();
    // });
    // console.log(minItem)
    setFirstList(picList.filter((text, index) => index % 3 === 0))
    setSecondList(picList.filter((text, index) => index % 3 === 1))
    setThirdList(picList.filter((text, index) => index % 3 === 2))
  }, [picList])

  return (
    <div
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 24,
      }}
    >
      <HorizotalList ref={firstRef} picList={firstList} />
      <HorizotalList ref={secondRef} picList={secondList} />
      <HorizotalList ref={thirdRef} picList={thirdList} />
    </div>
  )
}

InfiniteScroll.propTypes = {
  picList: PropTypes.arrayOf(PropTypes.string),
}

InfiniteScroll.defaultProps = {
  picList: [],
}

export default InfiniteScroll
