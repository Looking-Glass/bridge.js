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
| `args.client` | [`BridgeClient`](client_BridgeClient.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Monitor Disconnect"``

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
| `message.payload` | { value: { message: { value: string; name: string; type: "WSTRING"; }; event: { value: "Monitor Connect" \| "Monitor Disconnect" \| "Progress Start" \| "Progress Completion" \| "Progress Update" \| ... 6 more ... \| "Transport Control Pause"; name: string; type: "WSTRING"; }; progress: { ...; }; progress\_type: { ...; }; }... | `undefined` |
| `message.status` | { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
