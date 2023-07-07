[@lookingglass/bridge](../README.md) / [playlists/playlist](../modules/playlists_playlist.md) / Playlist

# Class: Playlist

[playlists/playlist](../modules/playlists_playlist.md).Playlist

Playlist class

## Table of contents

### Constructors

- [constructor](playlists_playlist.Playlist.md#constructor)

### Properties

- [items](playlists_playlist.Playlist.md#items)
- [loop](playlists_playlist.Playlist.md#loop)
- [name](playlists_playlist.Playlist.md#name)
- [orchestration](playlists_playlist.Playlist.md#orchestration)

### Methods

- [addItem](playlists_playlist.Playlist.md#additem)
- [addPlaylistItemToBridge](playlists_playlist.Playlist.md#addplaylistitemtobridge)
- [clearItems](playlists_playlist.Playlist.md#clearitems)
- [getCurrent](playlists_playlist.Playlist.md#getcurrent)
- [getInstance](playlists_playlist.Playlist.md#getinstance)
- [play](playlists_playlist.Playlist.md#play)
- [removeItem](playlists_playlist.Playlist.md#removeitem)
- [setName](playlists_playlist.Playlist.md#setname)

## Constructors

### constructor

• **new Playlist**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.items` | [`PlaylistItemType`](../modules/playlists_playlist.md#playlistitemtype)[] |
| `args.loop` | `boolean` |
| `args.name` | `string` |
| `args.orchestration` | `string` |

## Properties

### items

• **items**: [`PlaylistItemType`](../modules/playlists_playlist.md#playlistitemtype)[]

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

▸ **addItem**(`hologram`): `undefined` \| [`PlaylistItemType`](../modules/playlists_playlist.md#playlistitemtype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `hologram` | [`HologramType`](../modules/components_hologram.md#hologramtype) |

#### Returns

`undefined` \| [`PlaylistItemType`](../modules/playlists_playlist.md#playlistitemtype)

___

### addPlaylistItemToBridge

▸ **addPlaylistItemToBridge**(`item`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`PlaylistItemType`](../modules/playlists_playlist.md#playlistitemtype) |

#### Returns

`Promise`<`boolean`\>

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
| `«destructured»` | [`getPlayPlaylistJsonArgs`](../interfaces/playlists_playlist.getPlayPlaylistJsonArgs.md) |

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
| `«destructured»` | [`PlaylistArgs`](../interfaces/playlists_playlist.PlaylistArgs.md) |

#### Returns

`Promise`<`boolean`\>

___

### removeItem

▸ **removeItem**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`PlaylistItemType`](../modules/playlists_playlist.md#playlistitemtype) |

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
