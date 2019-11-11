import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { Button } from "@material-ui/core"

import _ from "lodash"

import "./tag.css"

/**
 * This component is the Tag.
 * @param {string} className - class name
 * @param {string} tagUrl - The URL for Tag landing page
 * @param {string} tagText - The Tag text of frontend
 */

const Tag = ({ className, tagText, ...otherProps }) => {
  return (
    <Button {...otherProps} className={className || "tag"} variant="outlined">
      {tagText}
    </Button>
  )
}

Tag.defaultProps = {
  className: "",
  style: {},
}

Tag.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Tag
