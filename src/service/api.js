import axios from "axios"
import config from "../config"
import { navigate } from "@reach/router"

axios.defaults.baseURL = config.baseUrl
const axiosSetting = {
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
}

const demoPayload = {
  tags: [
    {
      id: 1,
      type: "tag",
    },
  ],
  q: "c",
  page: 0,
}

export const getTags = () => {
  return axios.get("tags", axiosSetting).then(response => {
    return response.data
  })
}

export const getMedia = ({ id = 1 }) => {
  return axios.get(`/medias/${id}`, axiosSetting).then(response => {
    return response.data
  })
}

export const searchMedia = (payload = demoPayload) => {
  return axios.post("/medias", payload)
}

export const getGame = () => {
  return axios.get("/game").then(response => {
    const { status } = response

    switch (status) {
      case 401:
        navigate(`/game/login`)
        break
      default:
        return response
    }
  })
}

export const postGame = payload => {
  return axios.post("/game", payload)
}

export const getIsGamePlayer = () => {
  return axios.get("/game/getIsGamePlayer").then(response => {
    const { status } = response
    if (status == 401){
      return false;
    }
    return true;
  })
}


