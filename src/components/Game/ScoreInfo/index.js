import React from "react"

import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

import "./index.css"

const ScoreInfo = ({ currentIdx, score, isPepeSmiling }) => {
  const bgClassName = isPepeSmiling
    ? "gameScoreBg gameScoreBg--smile"
    : "gameScoreBg"

  return (
    <Box className="ScoreInfo">
      <Typography className="title" variant="h4" component="h1" align="center">
        第 {currentIdx + 1} 張文宣
      </Typography>

      <Box className={bgClassName}>
        <Typography className="score-label" component="span">
          分數:
        </Typography>
        <Typography className="score" component="span">
          {score}
        </Typography>
      </Box>
    </Box>
  )
}

export default ScoreInfo
