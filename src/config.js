const reportUrl =
	(!process.env.GOOGLE_SPREADSHEET_URL || process.env.GOOGLE_SPREADSHEET_URL === "development")
    ? "https://script.google.com/macros/s/AKfycbyfu_0T3D6XxIZiz4vwtPni74e0ztE0mGMwtIHGE5iJDS_TLy0/exec"
    : "https://script.google.com/macros/s/AKfycbw1wIyVKpTn0q1qvgjr81nb41N9fff9fEjbFUI34QJkYis5ia0/exec"

const config = {
  baseUrl: "https://api-dev.mylennonbuddy.com/api/",
  authUrl: "https://api-dev.mylennonbuddy.com/auth/google",
  reportUrl,
}

export default config
