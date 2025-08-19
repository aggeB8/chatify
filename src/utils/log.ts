const timestamped = (message: string) => {
    return `${new Date().toISOString()} ${message}`
}

const log = {
    log: (message: string) => {
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
