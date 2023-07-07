[@lookingglass/bridge](../README.md) / [components/eventsource](../modules/components_eventsource.md) / BridgeEventSource

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
- [ws](components_eventsource.BridgeEventSource.md#ws)

### Methods

- [addMessageHandler](components_eventsource.BridgeEventSource.md#addmessagehandler)
- [connectToBridgeEventSource](components_eventsource.BridgeEventSource.md#connecttobridgeeventsource)
- [disconnectEvent](components_eventsource.BridgeEventSource.md#disconnectevent)
- [removeMessageHandler](components_eventsource.BridgeEventSource.md#removemessagehandler)

## Constructors

### constructor

• **new BridgeEventSource**()

## Properties

### MessageHandler

• **MessageHandler**: [`MessageHandlerType`](../modules/components_eventsource.md#messagehandlertype)

___

### eventSource

• **eventSource**: `any`

___

### ws

• **ws**: `undefined` \| `WebSocket`

## Methods

### addMessageHandler

▸ **addMessageHandler**<`K`\>(`«destructured»`): `void`

adds a new message handler object to the BridgeEventSource class

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`BridgeEventMap`](../modules/schemas_schema_events.md#bridgeeventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `MessageHandler` | (`payload`: [`BridgeEventMap`](../modules/schemas_schema_events.md#bridgeeventmap)[`K`]) => `void` |
| › `event` | `K` |

#### Returns

`void`

___

### connectToBridgeEventSource

▸ **connectToBridgeEventSource**(`orchestration`): `Promise`<{ `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orchestration` | `string` |

#### Returns

`Promise`<{ `success`: `boolean`  }\>

___

### disconnectEvent

▸ **disconnectEvent**(): `void`

#### Returns

`void`

___

### removeMessageHandler

▸ **removeMessageHandler**<`K`\>(`«destructured»`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`BridgeEventMap`](../modules/schemas_schema_events.md#bridgeeventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `MessageHandler` | (`payload`: [`BridgeEventMap`](../modules/schemas_schema_events.md#bridgeeventmap)[`K`]) => `void` |
| › `event` | `K` |

#### Returns

`void`
