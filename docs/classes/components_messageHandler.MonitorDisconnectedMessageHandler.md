[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / MonitorDisconnectedMessageHandler

# Class: MonitorDisconnectedMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).MonitorDisconnectedMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"Monitor Disconnect"``\>

  ↳ **`MonitorDisconnectedMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.MonitorDisconnectedMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.MonitorDisconnectedMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.MonitorDisconnectedMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.MonitorDisconnectedMessageHandler.md#handle)

## Constructors

### constructor

• **new MonitorDisconnectedMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Monitor Disconnect"``

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
| `message.payload` | { type: "VARIANT\_MAP"; value: { message: { type: "WSTRING"; value: string; name: string; }; event: { type: "WSTRING"; value: "Monitor Connect" \| "Monitor Disconnect" \| "Progress Start" \| "Progress Completion" \| ... 6 more ... \| "Sync/Play Playlist Cancelled"; name: string; }; progress: { ...; }; progress\_type: { ...... | `undefined` |
| `message.status` | { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
