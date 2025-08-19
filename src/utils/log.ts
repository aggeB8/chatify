import * as Sentry from "@sentry/react"

const timestamped = (message: string) => {
    return `${new Date().toISOString()} ${message}`
}

const log = {
    log: (message: string) => {
        Sentry.logger.info("User triggered test log", { action: "test_log_button_click" })
        console.log(timestamped(message))
    },
    warn: (message: string) => {
        console.warn(timestamped(message))
    },
    error: (message: string) => {
        console.error(timestamped(message))
    }
}

export default log
