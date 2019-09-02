import axios from "axios"
import config from "../config"

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
