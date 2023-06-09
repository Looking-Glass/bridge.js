[@lookingglass/bridge.js](../README.md) / [components/eventsource](../modules/components_eventsource.md) / BridgeEventSource

# Class: BridgeEventSource

[components/eventsource](../modules/components_eventsource.md).BridgeEventSource

Attempt to establish a connection to Looking Glass Bridge's websocket connection.
the websocket connection will send events from Bridge to the client.

**`Param`**

## Table of contents

### Constructors

- [constructor](components_eventsource.BridgeEventSource.md#constructor)

### Properties

- [MessageHandler](components_eventsource.BridgeEventSource.md#messagehandler)
- [eventSource](components_eventsource.BridgeEventSource.md#eventsource)

### Methods

- [addMessageHandler](components_eventsource.BridgeEventSource.md#addmessagehandler)
- [connectToBridgeEventSource](components_eventsource.BridgeEventSource.md#connecttobridgeeventsource)

## Constructors

### constructor

• **new BridgeEventSource**()

## Properties

### MessageHandler

• **MessageHandler**: [`MessageHandlerType`](../modules/components_eventsource.md#messagehandlertype)

___

### eventSource

• **eventSource**: `any`

## Methods

### addMessageHandler

▸ **addMessageHandler**<`K`\>(`«destructured»`): `void`

adds a new message handler object to the BridgeEventSource class

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`BridgeEventMap`](../modules/schemas_events.md#bridgeeventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `MessageHandler` | (`payload`: [`BridgeEventMap`](../modules/schemas_events.md#bridgeeventmap)[`K`]) => `void` |
| › `event` | `K` |

#### Returns

`void`

___

### connectToBridgeEventSource

▸ **connectToBridgeEventSource**(`orchestration`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `orchestration` | `string` |

#### Returns

`void`
