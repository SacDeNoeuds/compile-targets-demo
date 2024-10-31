import esbuild from "esbuild"
import { solidPlugin } from "esbuild-plugin-solid"

const options = {
  entryPoints: ["interface/ui/solidjs-app.tsx"],
  bundle: true,
  outdir: "./dist/frontend/build",
  platform: "browser",
  target: "es2022",
  format: "esm",
  legalComments: "none",
  sourcemap: true,
  color: true,
  logLevel: "info",
  plugins: [solidPlugin()],
} satisfies esbuild.BuildOptions

esbuild.build(options).catch(() => process.exit(1))
