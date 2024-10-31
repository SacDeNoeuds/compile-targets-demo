/* @jsxImportSource hono/jsx */
import { Logger } from "@/std"
import {
  createApp,
  createRouter,
  defineEventHandler,
  serveStatic,
  toNodeListener,
} from "h3"
import { readFile, stat } from "node:fs/promises"
import { createServer } from "node:http"
import { join, resolve } from "node:path"
import { DynamicPage } from "./DynamicHonoPage"
import { HomePage } from "./HomePage"

const logger = new Logger("debug")
logger.info("yey!")

// Create an app instance
export const app = createApp()

// Create a new router and register it in app
const router = createRouter()
app.use(router)

const publicDir = resolve(process.cwd(), "dist/frontend")
console.info("publicDir", publicDir)

app.use(
  "/static",
  defineEventHandler((event) => {
    return serveStatic(event, {
      getContents: (id) => {
        const filePath = resolve(publicDir, id.replace(/^\//, ""))
        console.info("filePath", filePath)
        return readFile(filePath)
      },
      getMeta: async (id) => {
        const stats = await stat(join(publicDir, id)).catch(() => {})
        if (!stats || !stats.isFile()) return

        return {
          size: stats.size,
          mtime: stats.mtimeMs,
          type: "text/javascript",
        }
      },
    })
  }),
)

// Add a new route that matches GET requests to / path
router.get(
  "/",
  defineEventHandler((event) => {
    return String(<HomePage />)
  }),
)

router.get(
  "/dynamic",
  defineEventHandler((event) => {
    return String(<DynamicPage />)
  }),
)

createServer(toNodeListener(app)).listen(3000)

logger.info("visit http://localhost:3000/ for the hono-rendered page")
logger.info("visit http://localhost:3000/dynamic for the SolidJS-rendered page")
