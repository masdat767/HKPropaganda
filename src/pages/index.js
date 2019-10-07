import React, { useState, useEffect } from "react"
import { getTags, searchMedia, getMedia } from "../service/api"

import { Banner, InfiniteScroll } from "./landing"

import { Layout, SEO } from "../components"

const IndexPage = () => {
  const [tagList, setTagList] = useState([])
  const [picList, setPicList] = useState([])
  const [picPage, setPicPage] = useState(0)
  const [selectedTagList, setSelectedTagList] = useState([])
  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    fetchMediaData(0)
  }, [selectedTagList, keyword])

  useEffect(() => {
    // Get Tag List
    const fetchData = async () => {
      const result = await getTags()
      setTagList(result)
    }

    fetchData()
    fetchMediaData()
  }, [])

  const fetchMediaData = async () => {
    const searchPayload = {
      tags: selectedTagList,
      q: keyword,
      page: picPage,
    }
    const result = await searchMedia(searchPayload)

    setPicPage(picPage + 1)
    setPicList(prevState => prevState.concat(result.data))
  }

  const updateSearch = ({ updateKeyword, updateTagList }) => {
    if (updateKeyword !== keyword || updateTagList !== selectedTagList) {
      setKeyword(updateKeyword)
      setSelectedTagList(updateTagList)
      setPicList([])
      setPicPage(0)
    }
  }

  const banner = () => <Banner tagList={tagList} updateSearch={updateSearch} />

  const updateScroll = () => {
    fetchMediaData()
  }

  return (
    <Layout banner={banner()}>
      <SEO title="Home" />
      <InfiniteScroll picList={picList} updateScroll={updateScroll} />
    </Layout>
  )
}

export default IndexPage
