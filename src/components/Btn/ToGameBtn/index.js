import React from "react"
import { navigate } from "@reach/router"

import styles from "./index.module.css"

const ToGameBtn = ({ tagCount = 0 }) => {
  return (
    <div className={styles.ToGameBtn}>
      <button
        className={styles[`form__button`]}
        type="submit"
        onClick={() => navigate("/game")}
      >
        <p className={styles.mHide}>立即開始</p>
        <span className={styles.mHide}>tag文宣</span>

        <p className={styles.mShow}>立即開始tag文宣</p>
      </button>
      <p className={styles.countText}>仲有 {tagCount} 張文宣等緊你 Tag！</p>
    </div>
  )
}

export default ToGameBtn
