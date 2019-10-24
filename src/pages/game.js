import React from "react"
import { Router } from "@reach/router"
import { Container, Status, Game, Login, PrivateRoute } from "../components"

const GamePage = () => (
  <Container>
    {/* <Status /> */}
    <Router>
      <PrivateRoute path="/game" component={Game} />
      <Login path="/game/login" />
    </Router>
  </Container>
)

export default GamePage
