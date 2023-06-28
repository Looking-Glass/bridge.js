[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / ProgressCompletionMessageHandler

# Class: ProgressCompletionMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).ProgressCompletionMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"Progress Completion"``\>

  ↳ **`ProgressCompletionMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.ProgressCompletionMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.ProgressCompletionMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.ProgressCompletionMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.ProgressCompletionMessageHandler.md#handle)

## Constructors

### constructor

• **new ProgressCompletionMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Progress Completion"``

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
| `message.orchestration` | { value: string; type: "WSTRING"; name: string; } | `undefined` |
| `message.payload` | { value: { message: { value: string; type: "WSTRING"; name: string; }; event: { value: "Monitor Connect" \| "Monitor Disconnect" \| "Progress Start" \| "Progress Completion" \| "Progress Update" \| ... 5 more ... \| "Sync/Play Playlist Cancelled"; type: "WSTRING"; name: string; }; progress: { ...; }; progress\_type: { ...;... | `undefined` |
| `message.status` | { value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; type: "WSTRING"; name: string; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
