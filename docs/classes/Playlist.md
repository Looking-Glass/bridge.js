[@lookingglass/bridge.js](../README.md) / Playlist

# Class: Playlist

Playlist class

## Table of contents

### Constructors

- [constructor](Playlist.md#constructor)

### Properties

- [items](Playlist.md#items)
- [loop](Playlist.md#loop)
- [name](Playlist.md#name)
- [orchestration](Playlist.md#orchestration)

### Methods

- [addItem](Playlist.md#additem)
- [clearItems](Playlist.md#clearitems)
- [getCurrent](Playlist.md#getcurrent)
- [getInstance](Playlist.md#getinstance)
- [play](Playlist.md#play)
- [removeItem](Playlist.md#removeitem)
- [setName](Playlist.md#setname)

## Constructors

### constructor

• **new Playlist**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.items` | [`PlaylistItemType`](../README.md#playlistitemtype)[] |
| `args.loop` | `boolean` |
| `args.name` | `string` |
| `args.orchestration` | `string` |

## Properties

### items

• **items**: [`PlaylistItemType`](../README.md#playlistitemtype)[]

___

### loop

• **loop**: `boolean`

___

### name

• **name**: `string`

___

### orchestration

• **orchestration**: `string`

## Methods

### addItem

▸ **addItem**(`hologram`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hologram` | `Hologram` |

#### Returns

`void`

___

### clearItems

▸ **clearItems**(): `void`

#### Returns

`void`

___

### getCurrent

▸ **getCurrent**(`«destructured»`): `Object`

gets the object for the current playlist that is currently being played

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`getPlayPlaylistJsonArgs`](../interfaces/getPlayPlaylistJsonArgs.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `head_index` | `number` |
| `name` | `string` |
| `orchestration` | `string` |

___

### getInstance

▸ **getInstance**(`orchestration`): `Object`

create the json object for the playlist instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `orchestration` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `loop` | `boolean` |
| `name` | `string` |
| `orchestration` | `string` |

___

### play

▸ **play**(`«destructured»`): `Promise`<`boolean`\>

this function will play a playlist on a Looking Glass display
the playlist must be created and populated with content before calling this function

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`PlaylistArgs`](../interfaces/PlaylistArgs.md) |

#### Returns

`Promise`<`boolean`\>

___

### removeItem

▸ **removeItem**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`PlaylistItemType`](../README.md#playlistitemtype) |

#### Returns

`void`

___

### setName

▸ **setName**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`
