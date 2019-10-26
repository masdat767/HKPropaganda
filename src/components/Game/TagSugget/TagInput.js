import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import FormHelperText from "@material-ui/core/FormHelperText"
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  addBtn: {
    marginBottom: 4,
    width: 31,
    minWidth: "unset",
    padding: "2px 0",
  },
  box: {
    display: "flex",
    alignItems: "center",
  },
}))

const TagInput = ({
  additionalTag,
  errorMsg,
  onChange,
  onAddition,
  onKeyPress,
}) => {
  const classes = useStyles({ errorMsg })
  const hasErrMsg = !!errorMsg

  return (
    <Box className={classes.box}>
      <FormControl className={classes.formControl} error={hasErrMsg}>
        <InputLabel htmlFor="additional-tags">Additional Tags...</InputLabel>
        <Input
          id="additional-tags"
          aria-describedby="additional-tags-error-text"
          value={additionalTag}
          onKeyPress={onKeyPress}
          onChange={onChange}
        />
        <FormHelperText id="additional-tags-error-text">
          {errorMsg}
        </FormHelperText>
      </FormControl>
      <Button
        className={classes.addBtn}
        variant="contained"
        color="primary"
        onClick={onAddition}
      >
        <AddIcon />
      </Button>
    </Box>
  )
}

export default TagInput
