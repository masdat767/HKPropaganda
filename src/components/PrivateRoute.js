import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { navigate } from "@reach/router"

import { isLoggedIn } from "../utils/auth"
import { Login } from "../components"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const [RenderComponent, setRenderComponent] = useState(null)

  useEffect(() => {
    isLoggedIn().then(isAuth => {
      if (!isAuth && location.pathname !== "/game/login") {
        // If we’re not logged in, redirect to the home page.
        navigate(`/game/login`)

        setRenderComponent(<Login />)
      }

      setRenderComponent(<Component {...rest} />)
    })
  }, [])

  return RenderComponent
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
