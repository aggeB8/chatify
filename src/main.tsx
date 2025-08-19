//import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import * as Sentry from "@sentry/react"

Sentry.init({
    dsn: "https://92e348f863e88a514b67ce777cbbdf11@o4509869494304768.ingest.de.sentry.io/4509869496533072",
    integrations: [Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] })],
    enableLogs: true,
    sendDefaultPii: true
})

createRoot(document.getElementById("root")!).render(<App />)
