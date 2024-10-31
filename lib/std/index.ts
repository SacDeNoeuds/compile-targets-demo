type Level = "debug" | "log" | "info" | "warn" | "error"

const log =
  (level: Level) =>
  (...msg: unknown[]) => {
    console[level](...msg)
  }

export class Logger {
  constructor(private level: Level) {}
  log = log("log")
  info = log("info")
  debug = log("debug")
  warn = log("warn")
  error = log("error")
}
