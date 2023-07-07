[@lookingglass/bridge](../README.md) / [components/fallback](../modules/components_fallback.md) / Fallback

# Class: Fallback

[components/fallback](../modules/components_fallback.md).Fallback

provide a fallback in case we're unable to connect to bridge.
This class uses HoloPlay Core to see if the older API endpoint used in HoloPlay Service is available.

## Table of contents

### Constructors

- [constructor](components_fallback.Fallback.md#constructor)

### Properties

- [versionPromise](components_fallback.Fallback.md#versionpromise)
- [ws](components_fallback.Fallback.md#ws)

### Methods

- [errorCallback](components_fallback.Fallback.md#errorcallback)
- [getLegacyVersion](components_fallback.Fallback.md#getlegacyversion)
- [messageCallback](components_fallback.Fallback.md#messagecallback)

## Constructors

### constructor

• **new Fallback**()

## Properties

### versionPromise

• **versionPromise**: `number` \| `Promise`<`number`\>

___

### ws

• **ws**: `WebSocket`

## Methods

### errorCallback

▸ **errorCallback**(): `void`

#### Returns

`void`

___

### getLegacyVersion

▸ **getLegacyVersion**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

___

### messageCallback

▸ **messageCallback**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |

#### Returns

`Promise`<`void`\>
