[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / MessageHandler

# Class: MessageHandler<E\>

[components/messageHandler](../modules/components_messageHandler.md).MessageHandler

## Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof [`BridgeEventMap`](../modules/schemas_events.md#bridgeeventmap) |

## Hierarchy

- **`MessageHandler`**

  ↳ [`MonitorConnectedMessageHandler`](components_messageHandler.MonitorConnectedMessageHandler.md)

  ↳ [`MonitorDisconnectedMessageHandler`](components_messageHandler.MonitorDisconnectedMessageHandler.md)

  ↳ [`ProgressStartMessageHandler`](components_messageHandler.ProgressStartMessageHandler.md)

  ↳ [`ProgressCompletionMessageHandler`](components_messageHandler.ProgressCompletionMessageHandler.md)

  ↳ [`ProgressUpdateMessageHandler`](components_messageHandler.ProgressUpdateMessageHandler.md)

  ↳ [`PlaylistInstanceMessageHandler`](components_messageHandler.PlaylistInstanceMessageHandler.md)

  ↳ [`PlaylistInsertMessageHandler`](components_messageHandler.PlaylistInsertMessageHandler.md)

  ↳ [`PlaylistDeleteMessageHandler`](components_messageHandler.PlaylistDeleteMessageHandler.md)

  ↳ [`SyncPlayPlaylistMessageHandler`](components_messageHandler.SyncPlayPlaylistMessageHandler.md)

  ↳ [`SyncPlayPlaylistCompleteMessageHandler`](components_messageHandler.SyncPlayPlaylistCompleteMessageHandler.md)

  ↳ [`SyncPlayPlaylistCancelledMessageHandler`](components_messageHandler.SyncPlayPlaylistCancelledMessageHandler.md)

## Table of contents

### Constructors

- [constructor](components_messageHandler.MessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.MessageHandler.md#bridgeeventname)
- [client](components_messageHandler.MessageHandler.md#client)

### Methods

- [handle](components_messageHandler.MessageHandler.md#handle)

## Constructors

### constructor

• **new MessageHandler**<`E`\>(`args`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof [`BridgeEventMap`](../modules/schemas_events.md#bridgeeventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.bridgeEventName` | `E` |
| `args.client` | [`BridgeClient`](client.BridgeClient.md) |

## Properties

### bridgeEventName

• **bridgeEventName**: `E`

___

### client

• **client**: [`BridgeClient`](client.BridgeClient.md)

## Methods

### handle

▸ `Abstract` **handle**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`BridgeEventMap`](../modules/schemas_events.md#bridgeeventmap)[`E`] |

#### Returns

`void`
