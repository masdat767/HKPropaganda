import React from "react"

import styles from "./index.module.css"

const ToGameBtn = ({ tagCount = 0 }) => {
  return (
    <div className={styles.ToGameBtn}>
      <button className={styles[`form__button`]} type="submit">
        <p>立即開始</p>
        <span>tag文宣</span>
      </button>
      <p className={styles.countText}>目前仲有[{tagCount}]張文宣未TAG!</p>
    </div>
  )
}

export default ToGameBtn
