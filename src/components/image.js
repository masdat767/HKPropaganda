import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import _ from "lodash"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image = ({ className, style, imgSrc }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logo: file(relativePath: { eq: "gatsby-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      propaganda1: file(relativePath: { eq: "propaganda1.png" }) {
        childImageSharp {
          fluid(maxWidth: 500, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      propaganda2: file(relativePath: { eq: "propaganda2.png" }) {
        childImageSharp {
          fluid(maxWidth: 500, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      propaganda3: file(relativePath: { eq: "propaganda3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 500, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  console.log(data)

  const loadImageFluid = _.get(
    data,
    `${imgSrc}.childImageSharp.fluid`,
    data.placeholderImage.childImageSharp.fluid
  )

  return <Img className={className} style={style} fluid={loadImageFluid} />
}

Image.defaultProps = {
  className: "",
  style: {},
  imgSrc: "placeholderImage",
}

Image.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  imgSrc: PropTypes.string,
}

export default Image
