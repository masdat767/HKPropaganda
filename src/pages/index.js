import React, {useState} from "react"
import { Link } from "gatsby"
import { TextField } from "@material-ui/core"

import { Banner, InfiniteScroll } from "./landing"

import styles from "./landing.css"

import { Layout, Image, SEO } from "../components"

const newList = [
  "propaganda1",
  "propaganda2",
  "propaganda3",
  "propaganda4",
  "propaganda5"
]

const IndexPage = () => {
  const [demoInfinitScroll, setDemo] = useState([
    "propaganda2",
    "propaganda1",
    "propaganda3",
    "propaganda4",
    "propaganda5",
    "propaganda3",
    "propaganda1",
    "propaganda3",
    "propaganda5",
  ]);
  const banner = () => <Banner />

  const updateScroll = () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        setDemo((prevState) => prevState.concat(newList))
      }, 1500)
    });
  }

  return (
    <Layout banner={banner()}>
      <SEO title="Home" />
      <InfiniteScroll picList={demoInfinitScroll} updateScroll={updateScroll}/>
    </Layout>
  )
}

{
  /* <Link to="/page-2/">Go to page 2</Link> */
}

export default IndexPage
