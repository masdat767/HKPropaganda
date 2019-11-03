import { login } from '../service/auth'
import { getIsGamePlayer } from "../service/api"
const isBrowser = typeof window !== `undefined`

// const getUser = () =>
//     window.localStorage.gatsbyUser
//         ? JSON.parse(window.localStorage.gatsbyUser)
//         : {}

// const setUser = user => (window.localStorage.gatsbyUser = JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
    if (!isBrowser) return false

    login();
    // if (username === `gatsby` && password === `demo`) {
    //     console.log(`Credentials match! Setting the active user.`)
    //     return setUser({
    //         name: `Jim`,
    //         legalName: `James K. User`,
    //         email: `jim@example.org`,
    //     })
    // }

    return false
}

export const isLoggedIn = () => {
    if (!isBrowser) return false
    //call
    return getIsGamePlayer();
}

export const getCurrentUser = () => isBrowser && {}

export const logout = callback => {
    if (!isBrowser) return

    console.log(`Ensuring the \`gatsbyUser\` property exists.`)
    callback()
}
