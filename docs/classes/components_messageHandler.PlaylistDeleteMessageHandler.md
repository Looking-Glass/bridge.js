[@lookingglass/bridge.js](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / PlaylistDeleteMessageHandler

# Class: PlaylistDeleteMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).PlaylistDeleteMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"Playlist Delete"``\>

  ↳ **`PlaylistDeleteMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.PlaylistDeleteMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.PlaylistDeleteMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.PlaylistDeleteMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.PlaylistDeleteMessageHandler.md#handle)

## Constructors

### constructor

• **new PlaylistDeleteMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Playlist Delete"``

#### Inherited from

[MessageHandler](components_messageHandler.MessageHandler.md).[bridgeEventName](components_messageHandler.MessageHandler.md#bridgeeventname)

___

### client

• **client**: [`BridgeClient`](client.BridgeClient.md)

#### Inherited from

[MessageHandler](components_messageHandler.MessageHandler.md).[client](components_messageHandler.MessageHandler.md#client)

## Methods

### handle

▸ **handle**(`message`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `Object` | `undefined` |
| `message.name` | `string` | `schema.name` |
| `message.orchestration` | { type: "WSTRING"; value: string; name: string; } | `undefined` |
| `message.payload` | { type: "VARIANT\_MAP"; value: { message: { type: "WSTRING"; value: string; name: string; }; name: { type: "WSTRING"; value: string; name: string; }; event: { type: "WSTRING"; value: "Monitor Connect" \| "Monitor Disconnect" \| ... 8 more ... \| "Sync/Play Playlist Cancelled"; name: string; }; }; name: string; } | `undefined` |
| `message.status` | { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
