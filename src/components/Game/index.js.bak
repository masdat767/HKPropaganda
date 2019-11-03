import React, { useState, useEffect, useRef } from "react"
import { Layout, SEO } from ".."
import { getGame, postGame } from "../../service/api"
import classnames from "classnames"
import _ from "lodash"

import {
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  TextField,
} from "@material-ui/core"

import "../../theme/default.css"
import styles from "./game.module.css"

const Game = () => {
  const [isloading, setLoading] = useState(true)
  const [imageList, setImageList] = useState([])
  const [imageCount, setImageCount] = useState(0)
  // 0 => Before game
  // 1 => Game
  // 2 => End game
  const [stage, setStage] = useState(0)
  const [isImgLoading, setImgLoading] = useState(true)
  const [approveTagList, setApproveTagList] = useState([])
  const [otherTagList, setOtherTagList] = useState([])
  const [otherTagInput, setOtherTagInput] = useState("")

  useEffect(() => {
    getGame().then(response => {
      console.log("response.data", response.data)
      setLoading(false)
      setImageList(response.data)
    })
  }, [])

  useEffect(() => {
    if (imageCount % 10 === 4) {
      getGame().then(response => {
        setImageList(imageList.concat(response.data))
      })
    }
  }, [imageCount])

  console.log("image list", imageList)

  const beforeGame = () => {
    const startOnPress = () => {
      setStage(1)
    }

    return (
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <div className={styles.startGame}>Image Tagging system</div>
        </CardContent>
        <CardActions className={styles.cardButton}>
          <div className={styles.startBtn}>
            <Button onClick={startOnPress}>Start</Button>
          </div>
        </CardActions>
      </Card>
    )
  }

  const gameContent = () => {
    const imgItem = _.get(imageList, `${imageCount}`, {})
    const imgSrc = _.get(imgItem, `files[0].path`, "")
    const imgID = _.get(imgItem, `id`, "")
    const tagList = _.get(imgItem, "tags", [])

    const startOnPress = () => {
      let newInputTags = otherTagList
      if (otherTagInput.length > 0) {
        newInputTags.push({ name: otherTagInput })
      }
      const data = {
        media_id: imgID,
        approve_tags: approveTagList.map(id => ({ id })),
        input_tags: newInputTags,
      }
      postGame(data).then(console.log)
      setImageCount(imageCount + 1)
      setImgLoading(true)
      setApproveTagList([])
      setOtherTagList([])
      setOtherTagInput("")
    }

    const buttonListJSX = tagList.map(({ id, name }) => {
      const isApprove = approveTagList.includes(id)
      const tagOnClick = () => {
        if (isApprove) {
          setApproveTagList(prevState => prevState.filter(text => text !== id))
        } else {
          setApproveTagList(prevState => prevState.concat(id))
        }
      }
      return (
        <Button
          color={isApprove ? "primary" : "default"}
          className={styles.tagBtn}
          onClick={tagOnClick}
          key={id}
          variant={isApprove ? "contained" : "outlined"}
        >
          {name}
        </Button>
      )
    })

    return (
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <div className={styles.cardHeader}>{`Image ${imageCount + 1}`}</div>
          <img
            className={classnames(styles.cardImg, {
              [styles.cardImgLoading]: isImgLoading,
            })}
            src={imgSrc}
            alt={imgID}
            onLoad={() => {
              setImgLoading(false)
            }}
          />
          {isImgLoading ? (
            <div className={styles.loading}>
              <CircularProgress />
            </div>
          ) : null}
        </CardContent>
        <CardActions className={styles.cardButton}>
          <div className={styles.buttonGroup}>
            <div className={styles.tagQuestion}>
              Which follow tag is related to this image?
            </div>
            <div className={styles.tagList}>{buttonListJSX}</div>
            <div className={styles.tagQuestion}>
              Any other tag you want to add?
            </div>
            <div>
              <TextField
                label="Other Tag"
                value={otherTagInput}
                onChange={e => setOtherTagInput(e.target.value)}
              />
            </div>
            <div className={styles.nextBtn}>
              <Button
                onClick={startOnPress}
                variant="contained"
                color="primary"
              >
                Next
              </Button>
            </div>
          </div>
        </CardActions>
      </Card>
    )
  }

  const contentController = () => {
    if (isloading) {
      return <div>Loading</div>
    }

    switch (stage) {
      case 0:
        return beforeGame()
      case 1:
        return gameContent()
      default:
        return <div>error</div>
    }
  }

  return (
    <Layout>
      <SEO title="Game" />
      {contentController()}
    </Layout>
  )
}

export default Game
