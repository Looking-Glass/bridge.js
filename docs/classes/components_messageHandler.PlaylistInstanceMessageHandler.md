[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / PlaylistInstanceMessageHandler

# Class: PlaylistInstanceMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).PlaylistInstanceMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"Playlist Instance"``\>

  ↳ **`PlaylistInstanceMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.PlaylistInstanceMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.PlaylistInstanceMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.PlaylistInstanceMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.PlaylistInstanceMessageHandler.md#handle)

## Constructors

### constructor

• **new PlaylistInstanceMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client_BridgeClient.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Playlist Instance"``

#### Inherited from

[MessageHandler](components_messageHandler.MessageHandler.md).[bridgeEventName](components_messageHandler.MessageHandler.md#bridgeeventname)

___

### client

• **client**: [`BridgeClient`](client_BridgeClient.BridgeClient.md)

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
| `message.orchestration` | { value: string; name: string; type: "WSTRING"; } | `undefined` |
| `message.payload` | { value: { name: { value: string; name: string; type: "WSTRING"; }; message: { value: string; name: string; type: "WSTRING"; }; event: { value: "Monitor Connect" \| "Monitor Disconnect" \| "Progress Start" \| ... 12 more ... \| "All Events"; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } | `undefined` |
| `message.status` | { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
