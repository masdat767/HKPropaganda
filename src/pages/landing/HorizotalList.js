import React, { useRef, useImperativeHandle } from "react"

import { Image } from "../../components"

const HorizotalList = (props, ref) => {
  const { picList } = props
  const listRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getHeight: () => {
      return listRef.current.clientHeight
    },
  }))

  const picListJSX = picList.map(imgSrc => (
    <div
      style={{
        borderRadius: 8,
        marginBottom: 24,
        overflow: "hidden",
      }}
    >
      <Image
        imgSrc={imgSrc}
        style={{
          height: `100%`,
        }}
      />
    </div>
  ))

  return <div ref={listRef}>{picListJSX}</div>
}

export default React.forwardRef(HorizotalList)
