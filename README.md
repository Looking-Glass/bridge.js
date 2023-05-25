
> **Warning**
> Under heavy development, names may and will change abruptly

# bridge.js
The Bridge.JS library provides an easy way to connect to and leverage all the awesome functionality in [Looking Glass Bridge](https://docs.lookingglassfactory.com/getting-started/looking-glass-bridge). 

## Using the Library

To get started, import the library, either via script tag or via npm. Then create a new BridgeClient object like so. 

```js
const Bridge = new BridgeClient()
```

The BridgeClient object will automatically attempt to connect to Looking Glass Bridge. 

If it's unable to connect, for example if Bridge is not running when the object is initialized, you can manually try connecting by calling
```js
Bridge.CreateOrchestration()
```
You can also query to see if Bridge is running by running 
```js 
Bridge.QueryBridge()
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

