import esbuild from "esbuild"

// const filePath = fileURLToPath(import.meta.url)

const options = {
  entryPoints: ["interface/ui/h3-app.tsx"],
  bundle: true,
  outdir: "./dist/backend",
  platform: "node",
  target: "node22",
  format: "esm",
  legalComments: "none",
  sourcemap: true,
  color: true,
  logLevel: "info",
} satisfies esbuild.BuildOptions

esbuild.build(options).catch(() => process.exit(1))
