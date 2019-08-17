import React from "react"
import { Link } from "gatsby"
import { TextField } from "@material-ui/core"

import { Banner, HorizotalList } from "./landing"

import styles from "./landing.css"

import { Layout, Image, SEO } from "../components"

const IndexPage = () => {
  const banner = () => <Banner />

  return (
    <Layout banner={banner()}>
      <SEO title="Home" />
      <div style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 24
      }}>
        <HorizotalList />
        <HorizotalList />
        <HorizotalList />
      </div>
    </Layout>
  )
}

{
  /* <Link to="/page-2/">Go to page 2</Link> */
}

export default IndexPage
