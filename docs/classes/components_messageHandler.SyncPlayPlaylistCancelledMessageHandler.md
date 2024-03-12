[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / SyncPlayPlaylistCancelledMessageHandler

# Class: SyncPlayPlaylistCancelledMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).SyncPlayPlaylistCancelledMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"Sync/Play Playlist Cancelled"``\>

  ↳ **`SyncPlayPlaylistCancelledMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.SyncPlayPlaylistCancelledMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.SyncPlayPlaylistCancelledMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.SyncPlayPlaylistCancelledMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.SyncPlayPlaylistCancelledMessageHandler.md#handle)

## Constructors

### constructor

• **new SyncPlayPlaylistCancelledMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client_BridgeClient.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Sync/Play Playlist Cancelled"``

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
| `message.payload` | { value: { message: { value: string; name: string; type: "WSTRING"; }; event: { value: "Monitor Connect" \| "Monitor Disconnect" \| "Progress Start" \| "Progress Completion" \| "Progress Update" \| ... 10 more ... \| "All Events"; name: string; type: "WSTRING"; }; progress: { ...; }; progress\_type: { ...; }; }; name: stri... | `undefined` |
| `message.status` | { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
