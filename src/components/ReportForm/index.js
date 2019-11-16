import React, { useState } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"

import ReportContent from "./ReportContent"
import Feedback from "./Feedback"
import Loader from "./Loader"

import "./index.css"

export default function ReportForm({ setIsReportFormOpen, imageSrc, tags }) {
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

    setErrorMsg("")
    setStep("LOADING")

    // TODO: send the report request to backend
    setTimeout(() => {
      setStep("REPORT_SUCCESS")
    }, 1000)
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
        return <Feedback handleClose={handleClose} />

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
        <DialogTitle>Report</DialogTitle>

        {renderContent()}
      </Dialog>
    </div>
  )
}
