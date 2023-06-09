[@lookingglass/bridge.js](../README.md) / [playlists/playlistItems](../modules/playlists_playlistItems.md) / RGBDPlaylistItem

# Class: RGBDPlaylistItem

[playlists/playlistItems](../modules/playlists_playlistItems.md).RGBDPlaylistItem

## Hierarchy

- `PlaylistItem`

  ↳ **`RGBDPlaylistItem`**

## Table of contents

### Constructors

- [constructor](playlists_playlistItems.RGBDPlaylistItem.md#constructor)

### Properties

- [hologram](playlists_playlistItems.RGBDPlaylistItem.md#hologram)
- [id](playlists_playlistItems.RGBDPlaylistItem.md#id)
- [index](playlists_playlistItems.RGBDPlaylistItem.md#index)
- [orchestration](playlists_playlistItems.RGBDPlaylistItem.md#orchestration)
- [playlistName](playlists_playlistItems.RGBDPlaylistItem.md#playlistname)

### Methods

- [toBridge](playlists_playlistItems.RGBDPlaylistItem.md#tobridge)

## Constructors

### constructor

• **new RGBDPlaylistItem**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.hologram` | [`RGBDHologram`](components_hologram.RGBDHologram.md) |
| `args.id` | `number` |
| `args.index` | `number` |
| `args.orchestration` | `string` |
| `args.playlistName` | `string` |

#### Overrides

PlaylistItem.constructor

## Properties

### hologram

• **hologram**: [`Hologram`](../modules/components_hologram.md#hologram)

#### Inherited from

PlaylistItem.hologram

___

### id

• **id**: `number`

#### Inherited from

PlaylistItem.id

___

### index

• **index**: `number`

#### Inherited from

PlaylistItem.index

___

### orchestration

• **orchestration**: `string`

#### Inherited from

PlaylistItem.orchestration

___

### playlistName

• **playlistName**: `string`

#### Inherited from

PlaylistItem.playlistName

## Methods

### toBridge

▸ **toBridge**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `aspect` | `number` |
| `chroma_depth?` | ``0`` \| ``1`` |
| `cols` | `number` |
| `depth_inversion?` | ``0`` \| ``1`` |
| `depth_loc?` | ``0`` \| ``2`` \| ``1`` \| ``3`` |
| `depthiness?` | `number` |
| `id` | `number` |
| `index` | `number` |
| `isRGBD` | ``0`` \| ``1`` |
| `name` | `string` |
| `orchestration` | `string` |
| `rows` | `number` |
| `uri` | `string` |
| `view_count` | `number` |
| `zoom?` | `number` |

#### Inherited from

PlaylistItem.toBridge
