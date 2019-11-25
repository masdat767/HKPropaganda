import React, { useState } from "react"
import axios from "axios"

import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"

import ReportContent from "./ReportContent"
import Feedback from "./Feedback"
import Loader from "./Loader"

import config from "../../config"

import "./index.css"

export default function ReportForm({
  setIsReportFormOpen,
  imageSrc,
  tags,
  imageId,
}) {
  const [step, setStep] = useState("REPORT") // enum ['REPORT', 'REPORT_SUCCESS', 'LOADING']
  const [textInput, setTextInput] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleClose = () => {
    setIsReportFormOpen(false)
  }

  const handleSubmit = () => {
    if (!textInput.trim()) {
      setErrorMsg("Message cannot be empty")

      return
    }

    const reportData = { media_id: imageId, message: textInput }

    setErrorMsg("")
    setStep("LOADING")

    axios
      .post(config.reportUrl, reportData)
      .then(response => {
        if (response.data.result === "success") {
          setStep("REPORT_SUCCESS")
        } else {
          setStep("REPORT_FAILED")
        }
      })
      .catch(() => setStep("REPORT_FAILED"))
  }

  const handleTextInputChange = event => {
    setTextInput(event.currentTarget.value)
  }

  const renderContent = () => {
    switch (step) {
      case "REPORT":
        return (
          <ReportContent
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            imageSrc={imageSrc}
            tags={tags}
            textInput={textInput}
            errorMsg={errorMsg}
            handleTextInputChange={handleTextInputChange}
          />
        )

      case "REPORT_SUCCESS":
        return (
          <Feedback handleClose={handleClose}>
            多謝你提出有關問題, 我地會儘快改善
          </Feedback>
        )

      case "REPORT_FAILED":
        return (
          <Feedback handleClose={handleClose}>
            伺服器出錯, 請稍後再嘗試
          </Feedback>
        )

      case "LOADING":
        return <Loader />

      default:
        return <Loader />
    }
  }

  return (
    <div>
      <Dialog
        className="ReportForm"
        open={true}
        onClose={handleClose}
        aria-labelledby="ReportForm"
      >
        <DialogTitle>提出問題</DialogTitle>

        {renderContent()}
      </Dialog>
    </div>
  )
}
