import React from "react"
import PropTypes from "prop-types"
import styles from "./view.module.css"

const View = ({ title, style, children }) => (
  <section className={styles.view, style}>
    {title && <h1 className={styles[`view__heading`]}>{title}</h1>}
    {children}
  </section>
)

View.propTypes = {
  title: PropTypes.string.isRequired,
}

export default View
