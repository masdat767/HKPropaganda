import React, { useReducer, useEffect } from "react"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import get from "lodash/get"

import { SEO } from ".."
import { getGame, postGame } from "../../service/api"
import TagSelect from "./TagSelect"
import TagSuggest from "./TagSugget"
import Loader from "./Loader"
import { initialState, reducer } from "./gameReducer"
import { useStyles } from "./gameStyles"

import mockData from "./mock.json"

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

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    selectedTags,
    propagandaData,
    currentIndex,
    isLoading,
    isImgLoading,
    additionalTagList,
  } = state

  const classes = useStyles({ isImgLoading })
  const currentPropagandaData = propagandaData[currentIndex] || {}
  const imageId = get(currentPropagandaData, "id")
  const imageSrc = get(currentPropagandaData, "files.0.path", "")
  const tags = get(currentPropagandaData, "tags")

  const fetchPropagandaData = (shouldShowLoader = true) => {
    dispatch({ type: "FETCH_PROPAGANDA", payload: { shouldShowLoader } })

    // getGame().then(response => {
    //   dispatch({ type: "FETCH_PROPAGANDA_SUCCESS", payload: response.data })
    // })
    setTimeout(() => {
      dispatch({ type: "FETCH_PROPAGANDA_SUCCESS", payload: mockData })
    }, 1000)
  }

  const toNextImage = () => {
    const postData = createPostData(imageId, selectedTags, additionalTagList)

    dispatch({ type: "NEXT_PROPAGANDA" })
    // postGame(postData).then(console.log)
    console.log(
      "%c==== custom-log: post ====",
      "background: teal; color: #ffff6d",
      postData
    )

    // refetch when user loads the 8th image
    if (propagandaData.length - currentIndex < 5) {
      fetchPropagandaData(false)
    }
  }

  useEffect(fetchPropagandaData, [])

  console.log(
    "%c==== custom-log: state ====",
    "background: teal; color: #ffff6d",
    state
  )

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

      {isLoading ? (
        <Loader />
      ) : (
        <Box className={classes.contentBox}>
          <Container className={classes.mediaContainer}>
            {isImgLoading && <Loader />}

            <CardMedia
              className={classes.media}
              image={imageSrc}
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
              additionalTagList={additionalTagList}
              updateReference={imageId}
              dispatch={dispatch}
            />
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
              <Button color="primary" variant="contained" onClick={toNextImage}>
                Next
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  )
}

export default Game
