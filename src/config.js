const reportUrl =
  process.env.NODE_ENV === "production"
    ? "https://script.google.com/macros/s/AKfycbw1wIyVKpTn0q1qvgjr81nb41N9fff9fEjbFUI34QJkYis5ia0/exec"
    : "https://script.google.com/macros/s/AKfycbyfu_0T3D6XxIZiz4vwtPni74e0ztE0mGMwtIHGE5iJDS_TLy0/exec"

const config = {
  baseUrl: "https://api-dev.mylennonbuddy.com/api/",
  authUrl: "https://api-dev.mylennonbuddy.com/auth/google",
  reportUrl,
}

export default config
