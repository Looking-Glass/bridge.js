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

### Methods

- [AddItem](Playlist.md#additem)
- [ClearItems](Playlist.md#clearitems)
- [GetInstanceJson](Playlist.md#getinstancejson)
- [GetPlayPlaylistJson](Playlist.md#getplayplaylistjson)
- [GetPlaylistItemsAsJson](Playlist.md#getplaylistitemsasjson)
- [RemoveItem](Playlist.md#removeitem)
- [SetName](Playlist.md#setname)

## Constructors

### constructor

• **new Playlist**()

## Properties

### items

• **items**: [`PlaylistItemType`](../interfaces/PlaylistItemType.md)[]

___

### loop

• **loop**: `boolean`

___

### name

• **name**: `string`

## Methods

### AddItem

▸ **AddItem**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`PlaylistItemType`](../interfaces/PlaylistItemType.md) |

#### Returns

`void`

___

### ClearItems

▸ **ClearItems**(): `void`

#### Returns

`void`

___

### GetInstanceJson

▸ **GetInstanceJson**(`orchestration`): `string`

create the json object for the playlist instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `orchestration` | `string` |

#### Returns

`string`

___

### GetPlayPlaylistJson

▸ **GetPlayPlaylistJson**(`«destructured»`): `string`

creates the json object for playing the playlist

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`getPlayPlaylistJsonArgs`](../interfaces/getPlayPlaylistJsonArgs.md) |

#### Returns

`string`

___

### GetPlaylistItemsAsJson

▸ **GetPlaylistItemsAsJson**(`orchestration`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `orchestration` | `string` |

#### Returns

`string`[]

___

### RemoveItem

▸ **RemoveItem**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`PlaylistItemType`](../interfaces/PlaylistItemType.md) |

#### Returns

`void`

___

### SetName

▸ **SetName**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`
