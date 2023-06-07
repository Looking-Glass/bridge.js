[@lookingglass/bridge.js](../README.md) / PlaylistItemQuilt

# Class: PlaylistItemQuilt

## Hierarchy

- `PlaylistItem`

  ↳ **`PlaylistItemQuilt`**

## Table of contents

### Constructors

- [constructor](PlaylistItemQuilt.md#constructor)

### Properties

- [hologram](PlaylistItemQuilt.md#hologram)
- [id](PlaylistItemQuilt.md#id)
- [index](PlaylistItemQuilt.md#index)
- [orchestration](PlaylistItemQuilt.md#orchestration)
- [playlistName](PlaylistItemQuilt.md#playlistname)

### Methods

- [toBridge](PlaylistItemQuilt.md#tobridge)

## Constructors

### constructor

• **new PlaylistItemQuilt**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.hologram` | `QuiltHologram` |
| `args.id` | `number` |
| `args.index` | `number` |
| `args.orchestration` | `string` |
| `args.playlistName` | `string` |

#### Overrides

PlaylistItem.constructor

## Properties

### hologram

• **hologram**: `Hologram`

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
