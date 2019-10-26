import React from "react"
import PropTypes from "prop-types"
import { navigate } from "@reach/router"
import { isLoggedIn } from "../utils/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  // if (!isLoggedIn() && location.pathname !== `/game/login`) {
  //   // If we’re not logged in, redirect to the home page.
  //   navigate(`/game/login`)
  //   return null
  // }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
