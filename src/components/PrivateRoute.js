import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { navigate } from "@reach/router"

import { isLoggedIn } from "../utils/auth"
import { Login } from "../components"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  useEffect(() => {
    isLoggedIn().then(isAuth => {
      if (!isAuth && location.pathname !== "/game/login") {
        // If we’re not logged in, redirect to the home page.
        navigate(`/game/login`)

        return <Login />
      }

      return <Component {...rest} />
    })
  }, [])

  return null
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
