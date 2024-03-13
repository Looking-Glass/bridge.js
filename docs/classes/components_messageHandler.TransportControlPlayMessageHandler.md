[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / TransportControlPlayMessageHandler

# Class: TransportControlPlayMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).TransportControlPlayMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"Transport Control Play"``\>

  ↳ **`TransportControlPlayMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.TransportControlPlayMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.TransportControlPlayMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.TransportControlPlayMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.TransportControlPlayMessageHandler.md#handle)

## Constructors

### constructor

• **new TransportControlPlayMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client_BridgeClient.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Transport Control Play"``

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
| `message.payload` | { value: { name: { value: string; name: string; type: "WSTRING"; }; message: { value: string; name: string; type: "WSTRING"; }; event: { value: "Monitor Connect" \| "Monitor Disconnect" \| "New Item Playing" \| ... 13 more ... \| "All Events"; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } | `undefined` |
| `message.status` | { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
