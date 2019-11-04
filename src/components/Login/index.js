import React from "react"
import { navigate } from "@reach/router"
import { Form, View } from ".."
import { handleLogin, isLoggedIn } from "../../utils/auth"

import styles from "./login.module.css"

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  componentDidMount() {
    isLoggedIn().then(isAuth => {
      if (isAuth) {
        navigate("/game")
      }
    })
  }

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    return (
      <View style={styles[`view__login`]}>
        <div className={styles[`logo__login`]}></div>
        <Form
          handleUpdate={e => this.handleUpdate(e)}
          handleSubmit={e => this.handleSubmit(e)}
        />
      </View>
    )
  }
}

export default Login
