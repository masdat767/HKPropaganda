import React from "react"
import { Router } from "@reach/router"
import { Container, Status, Game, Login, PrivateRoute } from "../components"

import "../theme/default.css"

const GamePage = () => {
  return (
    <Container>
      {/* <Status /> */}
      <Router>
        {/* <Game path="/game" /> */}
        <PrivateRoute path="/game" component={Game} />
        <Login path="/game/login" />
      </Router>
    </Container>
  )
}

export default GamePage
