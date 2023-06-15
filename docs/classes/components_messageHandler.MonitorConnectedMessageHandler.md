[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / MonitorConnectedMessageHandler

# Class: MonitorConnectedMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).MonitorConnectedMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"Monitor Connect"``\>

  ↳ **`MonitorConnectedMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.MonitorConnectedMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.MonitorConnectedMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.MonitorConnectedMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.MonitorConnectedMessageHandler.md#handle)

## Constructors

### constructor

• **new MonitorConnectedMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Monitor Connect"``

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
| `message.payload` | { type: "VARIANT\_MAP"; value: { message: { type: "WSTRING"; value: string; name: string; }; head\_index: { type: "UNSIGNED\_INT"; value: number; name: string; }; name: { type: "WSTRING"; value: string; name: string; }; ... 8 more ...; y: { ...; }; }; name: string; } | `undefined` |
| `message.status` | { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
