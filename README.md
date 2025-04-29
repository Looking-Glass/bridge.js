> **Warning**
> Under active development, function signatures and API endpoints may be changed abruptly

# 🌉 bridge.js <!-- omit in toc -->

The Bridge.JS library provides an easy way to connect to and leverage all the awesome functionality in [Looking Glass Bridge](https://docs.lookingglassfactory.com/getting-started/looking-glass-bridge). There are a few key features, including:

* Casting a hologram to Bridge
* Casting a Playlist to Bridge
* Controlling Playback of Holograms & Playlists
* Editing Parameters of Holograms that are displayed in Bridge

## Table of contents <!-- omit in toc -->

- [Requirements](#requirements)
- [Installation](#installation)
- [Get Started](#get-started)
- [Key Concepts](#-key-concepts)
  - [Orchestrations](#orchestrations)
  - [Holograms](#holograms)
  - [Casting a Hologram](#casting-a-hologram)
  - [Playlists](#playlists)
  - [Checking if Functions Succeeded](#checking-if-functions-succeeded)
- [Organization](#organization)
- [Developing](#developing)

## Requirements
[Bridge 2.2](https://docs.lookingglassfactory.com/getting-started/looking-glass-bridge) or newer.

> **Note**
> For live examples, checkout [our demo site here](https://bridge-js.vercel.app/)

## Installation
You can import the library via a script tag or via npm.
The Bridge.JS library is published to npm [here](https://www.npmjs.com/package/@lookingglass/bridge)

```sh
npm install @lookingglass/bridge

# or install with yarn
yarn add @lookingglass/bridge
```

## Get Started

To get started, Make sure you have [Looking Glass Bridge](https://docs.lookingglassfactory.com/getting-started/looking-glass-bridge) running along with a [Looking Glass Display](https://lookingglassfactory.com/product-overview)

**We strongly recommend using [Typescript](https://www.typescriptlang.org/)**

```js
import {BridgeClient} from @lookingglass/bridge

const Bridge = BridgeClient.getInstance()
```

Bridge is a singleton class, meaning only one `Bridge` object can exist at a time. This is why we use the `getInstance()` function instead of trying to create a `new BridgeClient`

### Connecting to Bridge

The BridgeClient object will attempt to automatically connect to Bridge when created. You can connect or disconnect to Bridge by running the following:

```js
await Bridge.connect()

await Bridge.disconnect()
```

You can also check to see if you can connect to Bridge by running

```js
await Bridge.status()
```

## 🔑 Key Concepts

### Orchestrations

Looking Glass Bridge supports "orchestrations", these are essentially multi-user sessions. This means you can have multiple apps connected to the same orchestration, and get events from one another using the events from Bridge's websocket connection.

Orchestrations can be created by passing a keyword like `Orchestration2` or `gerald` into bridge. Bridge will return an `Orchestration Token` which is a specific string of characters that can be used internally in the Bridge.JS library.

As a developer, you shouldn't have to worry about this token, since this is always handled in the library for you once an orchestration is created. The only thing you'll need to pass to Bridge if you want an individual session is the string to create the orchestration. If you don't pass a string then a default orchestration will be used with the `default` keyword.

### Holograms

The Bridge.JS Library currently supports two hologram types, Quilts and RGBD, you need to construct the hologram object, then cast it to Bridge.

> **Note**
> In the examples below we use web based URLs in the `uri` field, but you can also use a file path location as well.

```js
const quilt = new QuiltHologram({
	uri: "https://s3.amazonaws.com/lkg-blocks/u/9aa4b54a7346471d/steampunk_qs8x13.jpg",
	settings: { rows: 13, columns: 8, aspect: 0.75, viewCount: 8 * 13 },
})

const rgbd = new RGBDHologram({
	uri: "https://dl-dev.blocks.glass/u/b528b9def6aa4986/rgbd.png",
	settings: {
		depthiness: 2.0,
		focus: 0,
		aspect: 1,
		chroma_depth: 0,
		depth_inversion: 0,
		depth_loc: 2,
		depth_cutoff: 1,
		zoom: 1,
	},
})
```

You can also dynamically create a hologram of either class by using the `hologramFactory` function. An example using this pattern can be found in the `src/react-app/components/HologramForm.tsx` component. In that component we utilize a form and allow the user to create a hologram from the UI.

### Casting a Hologram

To show a single hologram on the display, you can use the `cast` function like so:

```js
await Bridge.cast(hologram)
```

### Playlists

Looking Glass Bridge supports playing back Playlists of holograms. Like Orchestrations, Playlists are created by passing a keyword into the `createPlaylist` function. A Playlist isn't sent to Bridge itself until you play the playlist.

You'll want to add items to your playlist, which you can do with the `addItem` function.

```js
// create a playlist
const playlist = Bridge.createPlaylist("banana")

// create a hologram to put in the playlist
const quilt = new QuiltHologram({
	uri: "https://s3.amazonaws.com/lkg-blocks/u/9aa4b54a7346471d/steampunk_qs8x13.jpg",
	settings: { rows: 13, columns: 8, aspect: 0.75, viewCount: 8 * 13 },
})
// add the item to the playlist
playlist.addItem(quilt)
// play the playlist
await Bridge.play(playlist)
```

### Checking if functions succeeded.

All functions in Bridge.js return an object that contains a success value.
Given that most functions are asynchronous, you'll need to store the result as a variable and then check it.

For example:

```js
const cast = await Bridge.cast(hologram)
if (cast.success) {
	console.log("🥳 yay we did it!")
} else {
	console.log("😭")
}
```

## Organization

All files used in the library are in the `src/library` folder.

Most core functionality is exported as part of the `Bridge` object, though there are some helper functions that assist in creating hologram and playlist objects.

Responses and Requests to Bridge are strongly typed with the [Zod](https://github.com/colinhacks/zod) library. These are defined in the schemas folder.

**To ensure your file/functionality is exported from the library you must reference the file in index.ts**

Files in the react app are in the `src/react-app` folder.

## Developing

> **Note**
> This readme assumes your development environment is setup and you have node.js and yarn installed. If you don't have yarn, you can also use npm.

To start developing the library, clone this github repo. Then run `yarn install`

To develop the library run `yarn dev` This will spin up a minimal react environment that imports the library and supports full typesafety + hot reloading.

To build the library, run `yarn library` This will also auto-generate documentation via typedoc.

To build the react-app, run `yarn build`
