> **Warning**
> Under heavy development, names may and will change abruptly

# bridge.js

The Bridge.JS library provides an easy way to connect to and leverage all the awesome functionality in [Looking Glass Bridge](https://docs.lookingglassfactory.com/getting-started/looking-glass-bridge).

## Key Concepts

### Orchestrations

Looking Glass Bridge supports "orchestrations", these are essentially multi-user sessions. This means you can have multiple apps connected to the same orchestration, and get events from one another using the events from Bridge's websocket connection.

Orchestrations can be created by passing a keyword like `Orchestration2` or `gerald` into bridge. Bridge will return an `Orchestration Token` which is a specific string of characters that can be used internally in the Bridge.JS library.

As a developer, you shouldn't have to worry about this token, since this is always handled in the library for you once an orchestration is created. The only thing you'll need to pass to Bridge if you want an individual session is the string to create the orchestration. If you don't pass a string then a default orchestration will be used with the `default` keyword.

### Holograms

The Bridge.JS Library currently supports two hologram types, Quilts and RGBD, you need to construct the hologram object, then cast it to Bridge. Here's an example:

```js
const hologram = QuiltPlaylistItem({
	uri: "https://s3.amazonaws.com/lkg-blocks/u/9aa4b54a7346471d/steampunk_qs8x13.jpg",
	rows: 13,
	columns: 8,
	aspect: 0.75,
	viewCount: 8 * 13,
})

const rgbd_hologram = RGBDPlaylistItem({
	uri: "https://dl-dev.blocks.glass/u/b528b9def6aa4986/rgbd.png",
	depthiness: 1.0,
	rows: 8,
	columns: 6,
	focus: 0,
	aspect: 1,
	viewCount: 48,
	chroma_depth: 0,
	depth_inversion: 0,
	depth_loc: 2,
	depth_cutoff: 1,
})
```

### Playlists

Looking Glass Bridge supports playing back Playlists of holograms. Like Orchestrations, Playlists are created by passing a keyword into the `createPlaylist` function. A Playlist isn't sent to Bridge itself until you play the playlist.

You'll want to add items to your playlist, which you can do with the `addItem` function.

```js
const playlist = Bridge.createPlaylist("banana")

const hologram = QuiltPlaylistItem({
	uri: "https://s3.amazonaws.com/lkg-blocks/u/9aa4b54a7346471d/steampunk_qs8x13.jpg",
	rows: 13,
	columns: 8,
	aspect: 0.75,
	viewCount: 8 * 13,
})

playlist.addItem = hologram
await Bridge.play(playlist)
```

### Casting a Hologram

To show a single hologram on the display, you can use the `cast` function like so:

```js
await Bridge.cast(hologram)
```

## Using the Library

> **Note**
> For live examples, checkout [our demo site here](https://bridge-js.vercel.app/)

To get started, import the library, either via script tag or via npm. Then create a new Bridge object like so.

```js
import {Bridge} from @lookingglass/bridge
```

Bridge is a singleton class, meaning only one `Bridge` object can exist at a time.

### Connecting to Bridge

The Bridge object will automatically attempt to connect to Looking Glass Bridge.

If it's unable to connect, for example if Bridge is not running when the object is initialized, you can manually try connecting by calling

```js
await Bridge.createOrchestration()
```

You can also check to see if you can connect to Bridge by running

```js
await Bridge.status()
```

### Checking if functions succeeded.

All functions in Bridge.js return an object that contains a success value.
Given that most functions are asynchronous, you'll need to store the result as a variable and then check it.

For example:

```javascript
const cast = await Bridge.cast(hologram)
if (cast.success) {
	console.log("🥳 yay we did it!")
} else {
	console.log("😭")
}
```

## Organization

All files used in the library are in the `src/library` folder.

Most core functionality is exported as part of the `Bridge` object, though there are some helper functions that assist in creating proper hologram and playlist objects.

**To ensure your file/functionality is exported from the library you must reference the file in index.ts**

Files in the react app are in the `src/react-app` folder.

## Developing

> **Note**
> This readme assumes your development environment is setup and you have node.js and yarn installed. If you don't have yarn, you can also use npm.

To start developing the library, clone this github repo. Then run `yarn install`

To develop the library run `yarn dev` This will spin up a minimal react environment that imports the library and supports full typesafety + hot reloading.

To build the library, run `yarn library` This will also auto-generate documentation via typedoc.

To build the react-app, run `yarn build`
