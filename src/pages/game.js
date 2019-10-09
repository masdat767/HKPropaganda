import React, { useState, useEffect, useRef } from "react"
import { Layout, SEO } from "../components"
import {getGame} from "../service/api";
import classnames from "classnames";
import _ from "lodash"

import {Card, CardContent, CardActions, Button, CircularProgress } from '@material-ui/core';

import "../theme/default.css";
import styles from "./game.module.css";

const Game = () => {
    const [isloading, setLoading] = useState(true);
    const [imageList, setImageList] = useState([]);
    const [imageCount, setImageCount] = useState(0);
    // 0 => Before game
    // 1 => Game
    // 2 => End game
    const [stage, setStage] = useState(0);
    const [isImgLoading, setImgLoading] = useState(true);

    useEffect(() => {
        getGame().then((response) => {
            console.log('response.data', response.data)
            setLoading(false);
            setImageList(response.data);
        })
    }, [])

    const beforeGame = () => {
        const startOnPress = () => {
            setStage(1);
        }

        return (<Card className={styles.card}>
            <CardContent className={styles.cardContent}>
                <div className={styles.startGame}>
                    Image Tagging system
                </div>
            </CardContent>
            <CardActions className={styles.cardButton}>
                <div className={styles.startBtn}>
                    <Button onClick={startOnPress}>
                        Start
                    </Button> 
                </div>
                
            </CardActions>
        </Card>)
    }

    const gameContent = () => {
        const imgItem = _.get(imageList, `${imageCount}`, {});
        const imgSrc = _.get(imgItem, `files[0].path`, '');
        const imgID = _.get(imgItem, `id`, '');
        const tagList = _.get(imgItem, 'tags', []);

        const startOnPress = () => {
            if (imageCount + 1 > imageList.length - 1) {
                setStage(2);
            } else {
                setImageCount(imageCount + 1);
                setImgLoading(true);
            }
        }

        

        const buttonListJSX = tagList.map(({id, name}) => {
            const tagOnClick = () => {}
            return (<Button className={styles.tagBtn} onClick={tagOnClick} key={id} variant="outlined">
                {name}
            </Button>)
        })

        return (<Card className={styles.card}>
            <CardContent className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    {`Image ${imageCount + 1}`}
                </div>
                <img 
                    className={classnames(styles.cardImg, {[styles.cardImgLoading]: isImgLoading})} 
                    src={imgSrc}
                    alt={imgID} 
                    onLoad={() => {
                        setImgLoading(false);
                    }}
                />
                {
                    isImgLoading? <div className={styles.loading}>
                        <CircularProgress />
                    </div>: null
                }
            </CardContent>
            <CardActions className={styles.cardButton}>
                <div className={styles.buttonGroup}>
                    <div className={styles.tagQuestion}>
                        Which follow tag is related to this image?
                    </div>
                    <div className={styles.tagList}>
                        {buttonListJSX}
                    </div>
                    <div className={styles.nextBtn}>
                        <Button onClick={startOnPress} variant="contained" color="primary">
                            Next
                        </Button>
                    </div>
                </div>
                
            </CardActions>
        </Card>)
    }

    const endGame = () => {
        return (<Card className={styles.card}>
            <CardContent className={styles.cardContent}>
                <div className={styles.endGame}>
                    Thanks for helping us to work on the tag. :)
                </div>
            </CardContent>
        </Card>)
    }

    const contentController = () => {
        if (isloading){
            return (<div>Loading</div>)
        }

        switch(stage){
            case 0:
                return beforeGame();
            case 1:
                return gameContent();
            case 2:
                return endGame();
            default:
                return (<div>
                    error
                </div>)
        }
    }

    return (<Layout>
    <SEO title="Game" />
    {contentController()}
  </Layout>)
}

export default Game;