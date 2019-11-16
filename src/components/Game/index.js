import React, { useReducer, useEffect, useRef } from "react"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import get from "lodash/get"

import { SEO } from "../"
import { getGame, postGame, getTags } from "../../service/api"
import TagSelect from "./TagSelect"
import TagSuggest from "./TagSugget"
import Loader from "./Loader"
import { initialState, reducer } from "./gameReducer"
import { useStyles } from "./gameStyles"

const createPostData = (id, selectedTags, customTags) => {
  const approve_tags = Object.keys(selectedTags).reduce((acc, key) => {
    return selectedTags[key] ? [...acc, { id: key }] : acc
  }, [])

  return {
    media_id: id,
    input_tags: customTags,
    approve_tags,
  }
}

const getOptimizedSizingImgUrl = (width, url) => {
  if (width < 600) {
    return `${url}&w=320&h=320&fit=inside`
  } else if (width < 1366) {
    return `${url}&w=500&h=500&fit=inside`
  } else if (width <= 1920) {
    return `${url}&w=750&h=750&fit=inside`
  } else {
    return `${url}&w=1000&h=1000&fit=inside`
  }
}

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    selectedTags,
    propagandaData,
    currentIndex,
    loadingStatus,
    isImgLoading,
    customTagList,
    existingTagList,
    score,
  } = state

  const classes = useStyles({ isImgLoading })
  const deviceDimensionsRef = useRef({ height: 0, width: 0 })

  const currentPropagandaData = propagandaData[currentIndex] || {}
  const imageId = get(currentPropagandaData, "id")
  const imageSrc = get(currentPropagandaData, "files.0.path", "#")
  const tags = get(currentPropagandaData, "tags")
  const isLoading = Object.keys(loadingStatus).some(key => loadingStatus[key])

  const fetchPropagandaData = (shouldShowLoader = true) => {
    dispatch({ type: "FETCH_PROPAGANDA", payload: { shouldShowLoader } })

    getGame().then(response => {
      dispatch({ type: "FETCH_PROPAGANDA_SUCCESS", payload: response })
    })
  }

  const fetchTags = () => {
    dispatch({ type: "GET_TAGS" })

    getTags().then(response => {
      dispatch({ type: "GET_TAGS_SUCCESS", payload: response })
    })
  }

  const checkRefetchPropagandaData = () => {
    // refetch when user loads the 8th image
    if (propagandaData.length - currentIndex < 5) {
      fetchPropagandaData(false)
    }
  }

  const skip = () => {
    dispatch({ type: "NEXT_PROPAGANDA" })
    checkRefetchPropagandaData()
  }

  const toNextImage = () => {
    const postData = createPostData(imageId, selectedTags, customTagList)

    dispatch({ type: "NEXT_PROPAGANDA" })
    postGame(postData).then(response => {
      if (response.data.success) {
        dispatch({ type: "INCREASE_SCORE", payload: 10 })
      }
    })
    checkRefetchPropagandaData()
  }

  const updateDeviceDimensionInfo = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    deviceDimensionsRef.current = { width, height }
  }

  const isNextBtnDisabled = () => {
    return (
      Object.keys(selectedTags).every(tag => !selectedTags[tag]) &&
      customTagList.length === 0
    )
  }

  useEffect(() => {
    fetchTags()
    fetchPropagandaData(true)
  }, [])

  useEffect(updateDeviceDimensionInfo)

  return (
    <Box className={classes.box}>
      <SEO title="Game" />
      <Typography
        className={classes.title}
        variant="h4"
        component="h1"
        align="center"
      >
        Tag Propaganda: Image {currentIndex + 1}
      </Typography>
      <Typography component="p" align="center">
        Score: {score}
      </Typography>

      {isLoading ? (
        <Loader />
      ) : (
        <Box className={classes.contentBox}>
          <Container className={classes.mediaContainer}>
            {isImgLoading && <Loader />}

            <CardMedia
              className={classes.media}
              image={getOptimizedSizingImgUrl(
                deviceDimensionsRef.current.width,
                imageSrc
              )}
              alt={imageId}
              component="img"
              onLoad={() => dispatch({ type: "IMAGE_ON_LOAD" })}
            />
          </Container>

          <Container className={classes.tagContainer}>
            <TagSelect
              tags={tags}
              selectedTags={selectedTags}
              dispatch={dispatch}
            />
            <TagSuggest
              customTagList={customTagList}
              existingTagList={existingTagList}
              updateReference={imageId}
              dispatch={dispatch}
            />
            <Box className={classes.tagBtnContainer}>
              <Button
                className={classes.skipBtn}
                variant="contained"
                onClick={skip}
              >
                Skip
              </Button>
              <Button
                color="primary"
                variant="contained"
                disabled={isNextBtnDisabled()}
                onClick={toNextImage}
              >
                Next
              </Button>
            </Box>
            <Box className={classes.tagFooterContainer}>
              <Box>
                <Typography
                  variant="subtitle1"
                  component="h3"
                  classes={{ root: classes.typoRoot }}
                >
                  The collected tags will be used in
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="p"
                  classes={{ root: classes.typoRoot }}
                >
                  www.mylennonbuddy.com
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  )
}

export default Game
