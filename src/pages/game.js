import React, { useState, useEffect, useRef } from "react"
import { Layout, SEO } from "../components"
import {getGame} from "../service/api";
import _ from "lodash"

const Game = () => {
    const [fileList, setFileList] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        getGame().then((response) => {
            console.log('response.data', response.data)
            setFileList(response.data);
        })
    }, [])

    const contentController = () => {
        if (fileList.length > 0) {
            return (<div>
                Game Start
            </div>)
        }
        return (<div>Loading</div>)
    }

    return (<Layout>
    <SEO title="Game" />
    {contentController()}
  </Layout>)
}

export default Game;