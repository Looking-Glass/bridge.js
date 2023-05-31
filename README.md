> **Warning**
> Under heavy development, names may and will change abruptly

# bridge.js

The Bridge.JS library provides an easy way to connect to and leverage all the awesome functionality in [Looking Glass Bridge](https://docs.lookingglassfactory.com/getting-started/looking-glass-bridge).

## Using the Library

> **Note**
> For live examples, checkout [our demo site here](https://bridge-js.vercel.app/)

To get started, import the library, either via script tag or via npm. Then create a new Bridge object like so.

```js
import {Bridge} from @lookingglass/bridge
```

### Connecting to Bridge

The BridgeClient object will automatically attempt to connect to Looking Glass Bridge.

If it's unable to connect, for example if Bridge is not running when the object is initialized, you can manually try connecting by calling

```js
Bridge.CreateOrchestration()
```

You can also query to see if Bridge is running by running

```js
Bridge.QueryBridge()
```

### Casting a Hologram

The Bridge.JS Library outputs two hologram types, QuiltHologram and RGBDHologram, you need to construct the hologram object, then cast it to Bridge. Here's an example:

```js
const hologram = QuiltPlaylistItem({
	URI: "https://s3.amazonaws.com/lkg-blocks/u/9aa4b54a7346471d/steampunk_qs8x13.jpg",
	rows: 13,
	columns: 8,
	aspect: 0.75,
	viewCount: 8 * 13,
})

await Bridge.cast(hologram)
```

## Developing

> **Note**
> This readme assumes your development environment is setup and you have node.js and yarn installed. If you don't have yarn, you can also use npm.

To start developing the library, clone this github repo. Then run `yarn install` & `yarn dev` This will spin up a minimal react environment that imports the library.

To build the library, run `yarn library`

To build the react-app, run `yarn build`

### Organization

All files used in the library are in the `src/library` folder. To ensure your file/functionality is exported from the library you must reference the file in index.ts

Files in the react app are in the `src/react-app` folder.
