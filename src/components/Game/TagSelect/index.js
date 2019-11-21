import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyle = makeStyles(theme => ({
  card: {
    margin: "20px 0",
    padding: "15px 25px",
    [theme.breakpoints.down("xs")]: {
      margin: "4px 0",
    },
  },
}))

const TagSelect = ({ tags = [], selectedTags = {}, dispatch }) => {
  const classes = useStyle()

  const renderTags = () => {
    return tags.map(({ id, name }) => {
      const variant = selectedTags[id] ? "contained" : "outlined"

      return (
        <Button
          key={id}
          size="small"
          variant={variant}
          color="primary"
          onClick={() =>
            dispatch({ type: "UPDATE_TAG_SELECTION", payload: { id } })
          }
        >
          {name}
        </Button>
      )
    })
  }

  return (
    <Card className={classes.card}>
      <Typography component="h5">下面有冇相關Tag?</Typography>
      <CardActions>{renderTags()}</CardActions>
    </Card>
  )
}

export default TagSelect
