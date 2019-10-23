import config from "../config"

export const redirectToGoogle = () => {
    window.location = config.authUrl
}

export const login = () => {
    redirectToGoogle()
}