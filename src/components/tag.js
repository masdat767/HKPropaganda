import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

import _ from "lodash"

/**
 * This component is the Tag.
 * @param {string} className - class name
 * @param {string} tagUrl - The URL for Tag landing page
 * @param {string} tagText - The Tag text of frontend
 */

const Tag = ({ className, tagUrl, tagText }) => {

  return (
    <Link
      to={`/tag/${tagUrl}`}
      className={className}
      style={{
        margin: `0.1rem`,
        padding: `0.3rem 0.6rem`,
        border: `1px solid #A0A0A0`,
        borderRadius: `20px`,
        fontSize: `0.8rem`,
        textDecoration: `none`,
        color: `white`,
        textShadow: `1px 1px 1px #333`,
      }}
    >
      { tagText }
    </Link>
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
