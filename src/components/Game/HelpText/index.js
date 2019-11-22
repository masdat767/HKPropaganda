import React from "react"

import "./index.css"

const HelpText = ({ children }) => {
  return (
    <div className="HelpText">
      {children}
      <h3>Checklist:</h3>
      <h5>時間Tag</h5>
      <p>例如: 721, 831, 101, 1024, 1111</p>
      <h5>事件Tag</h5>
      <p>例如: 濫捕, 集氣, 香港人反抗?</p>
      <h5>地點Tag</h5>
      <p>例如: 太子, 旺角, 金鐘, 定係區區開花?</p>
      <h5>人物Tag</h5>
      <p>例如: 777, 黑警, 手足?</p>
    </div>
  )
}

export default HelpText
