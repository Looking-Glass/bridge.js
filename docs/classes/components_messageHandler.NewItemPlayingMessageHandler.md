[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / NewItemPlayingMessageHandler

# Class: NewItemPlayingMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).NewItemPlayingMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"New Item Playing"``\>

  ↳ **`NewItemPlayingMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.NewItemPlayingMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.NewItemPlayingMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.NewItemPlayingMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.NewItemPlayingMessageHandler.md#handle)

## Constructors

### constructor

• **new NewItemPlayingMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"New Item Playing"``

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
| `message.payload` | { value: { playlist\_name: { value: string; type: "WSTRING"; name: string; }; index: { value: number; type: "UNSIGNED\_INT"; name: string; }; event: { value: "Monitor Connect" \| "Monitor Disconnect" \| ... 9 more ... \| "Transport Control Pause"; type: "WSTRING"; name: string; }; }; type: "VARIANT\_MAP"; name: string; } | `undefined` |
| `message.status` | { value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; type: "WSTRING"; name: string; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
