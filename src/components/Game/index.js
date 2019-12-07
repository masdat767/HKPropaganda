import React, { useReducer, useEffect, useRef, Fragment } from "react"
import get from "lodash/get"

import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"

import { SEO } from "../"
import TagSelect from "./TagSelect"
import TagSuggest from "./TagSugget"
import Loader from "./Loader"
import Dialog from "./Dialog"
import HelpText from "./HelpText"
import ScoreInfo from "./ScoreInfo"

import { getGame, postGame, getTags } from "../../service/api"
import { initialState, reducer } from "./gameReducer"
import { useStyles } from "./gameStyles"
import styles from "./game.module.css"

import Logo from "../../images/logo_my_lennon_buddy.png"

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
    currentIdx,
    loadingStatus,
    isImgLoading,
    customTagList,
    existingTagList,
    score,
    shouldShowDialog,
    shouldShowHelpText,
    isPepeSmiling,
    isBrowserView,
  } = state

  const classes = useStyles({ isImgLoading })
  const deviceDimensionsRef = useRef({ height: 0, width: 0 })

  const currentPropagandaData = propagandaData[currentIdx] || {}
  const imageId = get(currentPropagandaData, "id")
  const imageSrc = get(currentPropagandaData, "files.0.path", "#")
  const tags = get(currentPropagandaData, "tags")
  const isLoading = Object.keys(loadingStatus).some(key => loadingStatus[key])
  const isNextBtnDisabled =
    Object.keys(selectedTags).every(tag => !selectedTags[tag]) &&
    customTagList.length === 0

  const fetchPropagandaData = ({ shouldShowLoader = true }) => {
    dispatch({ type: "FETCH_PROPAGANDA", payload: { shouldShowLoader } })

    getGame().then(response => {
      dispatch({ type: "FETCH_PROPAGANDA_SUCCESS", payload: response })
    })
  }

  const fetchTags = () => {
    dispatch({ type: "GET_TAGS" })

    getTags(true).then(response => {
      dispatch({ type: "GET_TAGS_SUCCESS", payload: response })
    })
  }

  const checkRefetchPropagandaData = () => {
    // refetch when user loads the 8th image
    if (propagandaData.length - currentIdx < 5) {
      fetchPropagandaData({ shouldShowLoader: false })
    }

    if (currentIdx % 10 === 9) {
      dispatch({ type: "OPEN_DIALOG" })
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
        setTimeout(() => {
          dispatch({ type: "RESET_SMILE" })
        }, 1000)
      }
    })
    checkRefetchPropagandaData()
  }

  const updateDeviceDimensionInfo = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    deviceDimensionsRef.current = { width, height }

    if (width > 600) {
      dispatch({ type: "UPDATE_DEVICE_VIEW_TYPE", payload: true })
    } else {
      dispatch({ type: "UPDATE_DEVICE_VIEW_TYPE", payload: false })
    }
  }

  const preloadImg = (data, idx) => {
    const nextPropagandaData = data[idx + 1] || {}
    const nextImageSrc = get(nextPropagandaData, "files.0.path", "#")

    new Image().src = getOptimizedSizingImgUrl(
      deviceDimensionsRef.current.width,
      nextImageSrc
    )
  }

  useEffect(() => {
    updateDeviceDimensionInfo()
    fetchTags()
    fetchPropagandaData({ shouldShowLoader: true })
    window.addEventListener("resize", updateDeviceDimensionInfo)

    return () => {
      window.removeEventListener("resize", updateDeviceDimensionInfo)
    }
  }, [])

  useEffect(() => {
    preloadImg(propagandaData, currentIdx)
  }, [propagandaData, currentIdx])

  return (
    <Box className={classes.box}>
      <SEO title="Game" />

      {isLoading ? (
        <Loader />
      ) : (
        <Box className={classes.contentBox}>
          <Container className={classes.mediaContainer}>
            {isBrowserView ? (
              <Box className={classes.logoContainer}>
                <img src={Logo} alt="Logo" />

                <Box>
                  <h2>文宣齊齊 Tag</h2>
                  <p>
                    文宣太多，單靠網站 Admin 好難 Tag
                    晒全部文宣，特別製作呢個小遊戲，邀請大家一齊加 Tag！
                  </p>
                </Box>
              </Box>
            ) : (
              <Fragment>
                <ScoreInfo
                  currentIdx={currentIdx}
                  score={score}
                  isPepeSmiling={isPepeSmiling}
                />
                <button
                  className={styles.helpBtn}
                  onClick={() => dispatch({ type: "TOGGLE_HELP_TEXT" })}
                >
                  <HelpOutlineIcon />
                </button>
                {shouldShowHelpText && (
                  <HelpText>
                    <HighlightOffIcon
                      className={styles.closeHelpTextBtn}
                      onClick={() => dispatch({ type: "TOGGLE_HELP_TEXT" })}
                    />
                  </HelpText>
                )}
              </Fragment>
            )}

            <div className={styles.imageContainer}>
              {isImgLoading && <Loader />}
              <CardMedia
                className={classes.media}
                src={getOptimizedSizingImgUrl(
                  deviceDimensionsRef.current.width,
                  imageSrc
                )}
                alt={imageId}
                component="img"
                onLoad={() => dispatch({ type: "IMAGE_ON_LOAD" })}
              />
              {/* <CardMedia
                style={{ display: "none" }}
                src={getOptimizedSizingImgUrl(
                  deviceDimensionsRef.current.width,
                  nextImageSrc
                )}
                alt="preload"
                component="img"
              /> */}
            </div>
          </Container>

          <Container className={classes.tagContainer}>
            {isBrowserView && (
              <div>
                <ScoreInfo
                  currentIdx={currentIdx}
                  score={score}
                  isPepeSmiling={isPepeSmiling}
                />
                <HelpText />
              </div>
            )}

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
                className={
                  isNextBtnDisabled ? classes.nextBtnDisabled : classes.nextBtn
                }
                color="primary"
                variant="contained"
                disabled={isNextBtnDisabled}
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

      {shouldShowDialog && (
        <Dialog
          closeDialog={() => dispatch({ type: "CLOSE_DIALOG" })}
          numOfTags={currentIdx}
        />
      )}
    </Box>
  )
}

export default Game
