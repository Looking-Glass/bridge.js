[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / PlaylistInsertMessageHandler

# Class: PlaylistInsertMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).PlaylistInsertMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"Playlist Insert"``\>

  ↳ **`PlaylistInsertMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.PlaylistInsertMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.PlaylistInsertMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.PlaylistInsertMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.PlaylistInsertMessageHandler.md#handle)

## Constructors

### constructor

• **new PlaylistInsertMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client_BridgeClient.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Playlist Insert"``

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
| `message.payload` | { value: { message: { value: string; name: string; type: "WSTRING"; }; index: { value: number; name: string; type: "UNSIGNED\_INT"; }; uri: { value: string; name: string; type: "WSTRING"; }; event: { value: "Monitor Connect" \| ... 14 more ... \| "All Events"; name: string; type: "WSTRING"; }; }; name: string; type: "V... | `undefined` |
| `message.status` | { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
