# Compile Targets Demo

Call it Astro if you want, but I dislike using tools I can’t understand because I want control over _my_ codebase. As much as I like Astro, it’s one of them.

This example gives all the flexibility I intend to have about deployment strategies.

## What I wanted to test

I wanted to test that, for a project – here `project-1/` –, I could use a common tsconfig to share all the `paths` alias **and** compile to different targets.

For the sake of testing, both backend and frontend use a `Logger` from the `lib/std` folder.

Here, my test is to use hono/jsx for server-side jsx and SolidJS for client-side jsx. I could even mix SolidJS and React for client-side since I ended up using pragma notation (see below).

## See it in action

```sh
npm ci
cd project-1
npx tsx ./bundle-h3.ts
npx tsx ./bundle-solidjs.ts

node ./dist/backend/h3-app.js
# visit http://localhost:3000/ for the hono-rendered page
# visit http://localhost:3000/dynamic for the SolidJS-rendered page
```

## How it works

I specify the `jsxImportSource` per file using the pragma `/* @jsxImportSource hono/jsx */` or `/* @jsxImportSource solid-js */`. See? Fairly easy to change.

I have 2 `bundle-*.ts` files, one for backend and one for frontend. This is due to esbuild forcing me to provide one platform at a time, if I was using RollupJS I could probably define multiple configs at once.

The SolidJS bundle config file still needs an additional SolidJS plugin, but that was all.

## In real life

For real projects, I think I'll have one main way to render JSX. Therefore I'd use a default tsconfig `jsxImportSource` and use the pragma only when necessary.

As summed up somewhere still private, I see 2 types of projects: local-first and server-first. In short: do you need to access your users’ data to do something with it (not talking about analytics here!) -> server-first. Do you not care a bit about your users’ data because it’s just for them -> local-first

- local-first projects -> my JSX will only be rendered client-side. One tsconfig `jsxImportSource` and job done.
- server-first projects -> mostly server-side jsx, maybe sometimes client-side for complicated forms like search or steppers or whatever.

## Going Further

I haven’t tested with Svelte, but I think I know where this goes: using a svelte plugin and, if need be, add another bundle config file.

So… yes, all good! So much more "module federation" in the end :unamused:
