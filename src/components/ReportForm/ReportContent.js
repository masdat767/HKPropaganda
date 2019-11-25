import React, { Fragment } from "react"
import axios from "axios"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import CardMedia from "@material-ui/core/CardMedia"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import FormHelperText from "@material-ui/core/FormHelperText"

import styles from "./ReportContent.module.css"

const ReportContent = ({
  handleClose,
  handleSubmit,
  imageSrc,
  tags,
  textInput,
  errorMsg,
  handleTextInputChange,
}) => {
  return (
    <Fragment>
      <DialogContent dividers>
        <DialogContentText className={styles.contentTitle}>
          如發現有任問題, 可於下面欄位中提出
        </DialogContentText>

        <Box>
          <CardMedia component="img" src={imageSrc} alt="" />
          <Typography color="textSecondary">Tags:</Typography>
          <Box className="tagWrapper">
            {tags.map(tag => {
              return (
                <span className="tag" key={tag.id}>
                  {tag.name}
                </span>
              )
            })}
          </Box>
        </Box>

        <TextField
          multiline
          autoFocus
          fullWidth
          rows="4"
          margin="normal"
          variant="outlined"
          placeholder="你發現左咩野問題?"
          value={textInput}
          error={!!errorMsg}
          onChange={handleTextInputChange}
        />
        {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={handleSubmit} color="secondary">
          提交
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default ReportContent
