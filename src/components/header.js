import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

import { AppBar, Toolbar } from "@material-ui/core"

const Header = () => {
  const [isAppBarOpen, setAppBarOpen] = useState(false)

  const appBarController = isAppBarOpen ? (
    <header>Here</header>
  ) : (
    <AppBar position="static">
      <Toolbar>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          Logo1
        </Link>
      </Toolbar>
    </AppBar>
  )

  return appBarController
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
