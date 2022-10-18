# looking-glass-bridge.js

This repo implements the functions to connect with Bridge.
All theses functions are defined in the /src/server/bridgeApis.ts file

This repo can also be used as a Vite Typescript React Express template
## Development

```
yarn
yarn dev:server
```

That should start the server. It will open to http://localhost:7456.

If you'd like to just develop the UI, you can use

```bash
yarn
yarn dev:client
```

To start the native vite client.

## Building

```
yarn build
yarn serve
```

yarn build will create the assets in `dist` - a `client` and `server` folder. Serve will run `dist/server.js` with Node, but feel free to change this to use Docker or some other process manager to suit your deployment needs.

## Files

`eslintrc.js` - a barebones eslint configuration for 2021, that extends off of the recommended ESLint config and prettier

`.prettierrc.js` - the prettier config

`index.html` - the vite entrypoint, that includes the entry point for the client

`postcss.config.cjs` - CommonJS module that defines the PostCSS config

`server.ts` - The barebones Express server with logic for SSRing Vite pages

`tailwind.config.cjs` - CommonJS module that defines the Tailwind config

`tsconfig.json` - TypeScript configuration

`vite.config.ts` - Vite configuration

