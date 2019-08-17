import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { TextField, InputAdornment } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

import { Image } from "../../components"

import "./Banner.module.css"

const Banner = () => {
  const SearchBar = withStyles({
    root: {
      "& input + fieldset": {
        background: "white",
        borderRadius: 30,
        borderWidth: 1,
        zIndex: -1,
      },
    },
  })(TextField)

  return (
    <>
      <div
        style={{
          position: `relative`,
          height: `400px`,
          maxHeight: `400px`,
        }}
      >
        <div
          style={{
            position: `absolute`,
            top: 0,
            left: 0,
            zIndex: 100,
            height: `100%`,
            width: `100%`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            color: `white`,
            flexDirection: `column`,
          }}
        >
          <h1
            style={{
              textShadow: `0px 0px 4px black`,
            }}
          >
            Hong Kong Protest Propaganda Library
          </h1>
          <div
            style={{
              textShadow: `0px 0px 4px black`,
            }}
          >
            The TG's source of freely useable images
          </div>
          <div
            style={{
              textShadow: `0px 0px 4px black`,
            }}
          >
            Powered by HongKongese
          </div>
          <SearchBar
            style={{ width: `50%` }}
            placeholder="Search Hong Kong Protest Images and Video Here"
            onChange={() => {}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            margin="normal"
            variant="outlined"
          />
        </div>
        <div
          style={{
            height: `100%`,
            filter: `blur(4px)`,
          }}
        >
          <Image
            imgSrc="propaganda2"
            style={{
              height: `100%`,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Banner
