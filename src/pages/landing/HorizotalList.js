import React, { useRef, useImperativeHandle } from "react"
import _ from "lodash";

import { Link } from "gatsby"
import { Card } from "../../components"

const HorizotalList = (props, ref) => {
  const { picList } = props
  const listRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getHeight: () => {
      return listRef.current.clientHeight
    },
  }))

  const picListJSX = _.map(picList, (imgData, idx) => (
    <div
      style={{
        borderRadius: 8,
        marginBottom: 24,
        overflow: "hidden",
      }}
      key={idx}
    >
      <Card imgData={imgData} />
    </div>
  ))

  return <div ref={listRef}>{picListJSX}</div>
}

export default React.forwardRef(HorizotalList)
