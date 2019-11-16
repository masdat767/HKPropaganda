import React, { useState, useEffect } from "react"
import { getTags, searchMedia, getMedia } from "../service/api"

import { Banner, InfiniteScroll } from "./landing"

import { Layout, SEO } from "../components"

import "../theme/default.css"

const IndexPage = () => {
  const [tagList, setTagList] = useState([])
  const [picList, setPicList] = useState([])
  const [picPage, setPicPage] = useState(0)
  const [selectedTagList, setSelectedTagList] = useState([])
  const [keyword, setKeyword] = useState("")
  const [hasMoreImage, setHasMoreImage] = useState(true)

  useEffect(() => {
    fetchMediaData()
  }, [selectedTagList, keyword])

  useEffect(() => {
    // Get Tag List
    const fetchData = async () => {
      const result = await getTags()
      setTagList(result)
    }

    fetchData()
  }, [])

  const fetchMediaData = async () => {
    const searchPayload = {
      tags: selectedTagList,
      q: keyword,
      page: picPage,
    }
    const { data } = await searchMedia(searchPayload)

    if (data.length === 0) {
      setHasMoreImage(false)

      return
    }

    setPicPage(picPage + 1)
    setPicList(picList.concat(data))
  }

  const updateSearch = ({ updateKeyword, updateTagList }) => {
    if (updateKeyword !== keyword || updateTagList !== selectedTagList) {
      setKeyword(updateKeyword)
      setSelectedTagList(updateTagList)
      setPicList([])
      setPicPage(0)
    }
  }

  const banner = () => (
    <Banner tagList={tagList} updateSearch={updateSearch} picList={picList} />
  )

  const updateScroll = () => {
    fetchMediaData()
  }

  return (
    <Layout banner={banner()}>
      <SEO title="Home" />
      <InfiniteScroll
        picList={picList}
        updateScroll={updateScroll}
        hasMoreImage={hasMoreImage}
      />
    </Layout>
  )
}

export default IndexPage
