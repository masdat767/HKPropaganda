import React from "react"
import { navigate } from "@reach/router"

import styles from "./form.module.css"

export default function Form({ handleSubmit, handleUpdate }) {
  return (
    <form
      className={styles.form}
      method="post"
      onSubmit={event => {
        handleSubmit(event)
        navigate(`/game`)
      }}
    >
      <h2>文宣齊齊 Tag</h2>
      <p>
        文宣太多，單靠網站 Admin 好難 Tag
        晒全部文宣，特別製作呢個小遊戲，邀請大家一齊加 Tag！
      </p>
      {/* <p className={styles[`form__instructions`]}>
      For this demo, please log in with the username <code>gatsby</code> and the
      password <code>demo</code>.
    </p>
    <label className={styles[`form__label`]}>
      Username
      <input
        className={styles[`form__input`]}
        type="text"
        name="username"
        onChange={handleUpdate}
      />
    </label>
    <label className={styles[`form__label`]}>
      Password
      <input
        className={styles[`form__input`]}
        type="password"
        name="password"
        onChange={handleUpdate}
      />
    </label> */}
      {/* <div>↓立即開始↓</div>
      <input
        className={styles[`form__button`]}
        type="submit"
        value="Log in with Google"
      /> */}
      <button className={styles[`form__button`]} type="submit">
        <p>立即開始</p>
        <span>log in with Google</span>
      </button>
    </form>
  )
}
