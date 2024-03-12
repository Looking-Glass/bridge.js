[@lookingglass/bridge](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / AllEventsMessageHandler

# Class: AllEventsMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).AllEventsMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<keyof [`BridgeEventMap`](../modules/schemas_schema_events.md#bridgeeventmap)\>

  ↳ **`AllEventsMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.AllEventsMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.AllEventsMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.AllEventsMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.AllEventsMessageHandler.md#handle)

## Constructors

### constructor

• **new AllEventsMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client_BridgeClient.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: keyof [`BridgeEventMap`](../modules/schemas_schema_events.md#bridgeeventmap)

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
| `message.payload` | { value: { message: { value: string; name: string; type: "WSTRING"; }; event: { value: "Monitor Connect" \| "Monitor Disconnect" \| "Progress Start" \| "Progress Completion" \| "Progress Update" \| ... 10 more ... \| "All Events"; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } | `undefined` |
| `message.status` | { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } | `schema.status` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
