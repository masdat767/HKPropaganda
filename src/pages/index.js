import React from "react"
import { Link } from "gatsby"
import { TextField } from "@material-ui/core"

import { Banner, InfiniteScroll } from "./landing"

import styles from "./landing.css"

import { Layout, Image, SEO } from "../components"

const IndexPage = () => {
  const banner = () => <Banner />

  const demoInfinitScroll = [
    "propaganda2",
    "propaganda1",
    "propaganda3",
    "propaganda4",
    "propaganda5",
    "propaganda3",
    "propaganda1",
    "propaganda3",
    "propaganda5",
  ]

  return (
    <Layout banner={banner()}>
      <SEO title="Home" />
      <InfiniteScroll picList={demoInfinitScroll} />
    </Layout>
  )
}

{
  /* <Link to="/page-2/">Go to page 2</Link> */
}

export default IndexPage
