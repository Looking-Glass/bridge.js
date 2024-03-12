[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / TransportControlPreviousMessageHandler

# Class: TransportControlPreviousMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).TransportControlPreviousMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"Transport Control Previous"``\>

  ↳ **`TransportControlPreviousMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.TransportControlPreviousMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.TransportControlPreviousMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.TransportControlPreviousMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.TransportControlPreviousMessageHandler.md#handle)

## Constructors

### constructor

• **new TransportControlPreviousMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client_BridgeClient.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Transport Control Previous"``

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
| `message.payload` | { value: { name: { value: string; name: string; type: "WSTRING"; }; message: { value: string; name: string; type: "WSTRING"; }; event: { value: "Monitor Connect" \| "Monitor Disconnect" \| "Progress Start" \| ... 12 more ... \| "All Events"; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } | `undefined` |
| `message.status` | { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
