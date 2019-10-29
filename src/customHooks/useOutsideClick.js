import { useEffect } from "react"

function useOutsideClick(ref, eventHandler) {
  function handleOutsideClick(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      eventHandler(event)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick)

    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  })
}

export default useOutsideClick
