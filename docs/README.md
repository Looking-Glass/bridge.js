@lookingglass/bridge.js

# @lookingglass/bridge.js

## Table of contents

### Classes

- [BridgeClient](classes/BridgeClient.md)
- [Playlist](classes/Playlist.md)
- [PlaylistItemQuilt](classes/PlaylistItemQuilt.md)
- [PlaylistItemRGBD](classes/PlaylistItemRGBD.md)

### Interfaces

- [PlaylistArgs](interfaces/PlaylistArgs.md)
- [PlaylistItemArgs](interfaces/PlaylistItemArgs.md)
- [PlaylistType](interfaces/PlaylistType.md)
- [getPlayPlaylistJsonArgs](interfaces/getPlayPlaylistJsonArgs.md)

### Type Aliases

- [PlaylistItemType](README.md#playlistitemtype)

### Variables

- [Bridge](README.md#bridge)

## Type Aliases

### PlaylistItemType

Ƭ **PlaylistItemType**: [`PlaylistItemQuilt`](classes/PlaylistItemQuilt.md) \| [`PlaylistItemRGBD`](classes/PlaylistItemRGBD.md)

## Variables

### Bridge

• `Const` **Bridge**: [`BridgeClient`](classes/BridgeClient.md)

The singleton instance of the `BridgeClient` class.

**`See`**

[BridgeClient](classes/BridgeClient.md)

It exposes the following methods:
 - [displays](classes/BridgeClient.md#displays)
 - [cast](classes/BridgeClient.md#cast)
 - [addEventListener](classes/BridgeClient.md#addeventlistener)
 - [initializeEventSource](classes/BridgeClient.md#initializeeventsource)
 - [getVerbosity](classes/BridgeClient.md#getverbosity)
 - [setVerbosity](classes/BridgeClient.md#setverbosity)
 - Bridge.isVersionCompatible
 - Bridge.isValid
 - [version](classes/BridgeClient.md#version)
 - Bridge.orchestration
 - Bridge.lkgDisplays
