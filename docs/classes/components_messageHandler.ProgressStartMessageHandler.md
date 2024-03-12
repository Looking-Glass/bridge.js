[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / ProgressStartMessageHandler

# Class: ProgressStartMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).ProgressStartMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"Progress Start"``\>

  ↳ **`ProgressStartMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.ProgressStartMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.ProgressStartMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.ProgressStartMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.ProgressStartMessageHandler.md#handle)

## Constructors

### constructor

• **new ProgressStartMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client_BridgeClient.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Progress Start"``

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
| `message.payload` | { value: { message: { value: string; name: string; type: "WSTRING"; }; event: { value: "Monitor Connect" \| "Monitor Disconnect" \| "New Item Playing" \| "Progress Start" \| "Progress Completion" \| ... 11 more ... \| "All Events"; name: string; type: "WSTRING"; }; progress: { ...; }; progress\_type: { ...; }; }; name: str... | `undefined` |
| `message.status` | { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
