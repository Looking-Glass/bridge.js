[@lookingglass/bridge](../README.md) / [playlists/playlistItems](../modules/playlists_playlistItems.md) / QuiltPlaylistItem

# Class: QuiltPlaylistItem

[playlists/playlistItems](../modules/playlists_playlistItems.md).QuiltPlaylistItem

## Hierarchy

- `PlaylistItem`

  ↳ **`QuiltPlaylistItem`**

## Table of contents

### Constructors

- [constructor](playlists_playlistItems.QuiltPlaylistItem.md#constructor)

### Properties

- [hologram](playlists_playlistItems.QuiltPlaylistItem.md#hologram)
- [id](playlists_playlistItems.QuiltPlaylistItem.md#id)
- [index](playlists_playlistItems.QuiltPlaylistItem.md#index)
- [orchestration](playlists_playlistItems.QuiltPlaylistItem.md#orchestration)
- [playlistName](playlists_playlistItems.QuiltPlaylistItem.md#playlistname)

### Methods

- [toBridge](playlists_playlistItems.QuiltPlaylistItem.md#tobridge)

## Constructors

### constructor

• **new QuiltPlaylistItem**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.hologram` | [`QuiltHologram`](components_hologram.QuiltHologram.md) |
| `args.id` | `number` |
| `args.index` | `number` |
| `args.orchestration` | `string` |
| `args.playlistName` | `string` |

#### Overrides

PlaylistItem.constructor

## Properties

### hologram

• **hologram**: [`HologramType`](../modules/components_hologram.md#hologramtype)

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
| `focus` | `number` |
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
