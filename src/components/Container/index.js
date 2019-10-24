import React from "react"
import { Helmet } from "react-helmet"

import Header from "../Header"

// Global styles and component-specific styles.
import "./global.css"
import styles from "./main.module.css"

const Container = ({ children }) => (
    <main className={styles.main}>{children}</main>
)

export default Container
