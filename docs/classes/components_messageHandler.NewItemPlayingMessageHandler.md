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
| `args.client` | [`BridgeClient`](client_BridgeClient.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"New Item Playing"``

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
| `message.payload` | { value: { index: { value: number; name: string; type: "UNSIGNED\_INT"; }; playlist\_name: { value: string; name: string; type: "WSTRING"; }; event: { value: "Monitor Connect" \| "Monitor Disconnect" \| ... 9 more ... \| "Transport Control Pause"; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } | `undefined` |
| `message.status` | { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
