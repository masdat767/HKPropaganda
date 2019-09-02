import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import {Button} from '@material-ui/core';

import _ from "lodash"

/**
 * This component is the Tag.
 * @param {string} className - class name
 * @param {string} tagUrl - The URL for Tag landing page
 * @param {string} tagText - The Tag text of frontend
 */

const Tag = ({ className, tagText, ...otherProps }) => {

  return (
    <Button
      {...otherProps}
      className={className}
      style={{
        margin: `4px 2px`,
        border: `1px solid #A0A0A0`,
        borderRadius: `20px`,
        fontSize: `0.8rem`,
        color: `white`,
        textShadow: `1px 1px 2px #333`,
        textTransform: 'capitalize',
      }}
      variant="outlined"
    >
      { tagText }
    </Button>
  )
}

Tag.defaultProps = {
  className: "",
  style: {},
  imgSrc: "placeholderImage",
}

Tag.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  imgSrc: PropTypes.string,
}

export default Tag
