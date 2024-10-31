/* @jsxImportSource solid-js */
import { Logger } from "@/std"
import { render } from "solid-js/web"
import { DynamicPage } from "./DynamicSolidPage"

const logger = new Logger("debug")
logger.info("yey!")
const root = document.getElementById("root")
if (!root) throw new Error("No Root")

render(() => <DynamicPage />, root)
