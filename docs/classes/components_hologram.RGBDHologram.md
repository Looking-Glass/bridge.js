[@lookingglass/bridge](../README.md) / [components/hologram](../modules/components_hologram.md) / RGBDHologram

# Class: RGBDHologram

[components/hologram](../modules/components_hologram.md).RGBDHologram

Create a new RGBD Hologram

## Table of contents

### Constructors

- [constructor](components_hologram.RGBDHologram.md#constructor)

### Properties

- [settings](components_hologram.RGBDHologram.md#settings)
- [type](components_hologram.RGBDHologram.md#type)
- [uri](components_hologram.RGBDHologram.md#uri)

## Constructors

### constructor

• **new RGBDHologram**(`args`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `args` | `Object` | `undefined` | - |
| `args.settings` | `Object` | `undefined` | - |
| `args.settings.aspect` | `number` | `undefined` | Aspect Ratio of the hologram, this should match the source image you provide, not the RGBD Pair |
| `args.settings.chroma_depth` | ``0`` \| ``1`` | `undefined` | Is the depth map chroma or grayscale? 0 for false, 1 for true |
| `args.settings.columns?` | `number` | `undefined` | - |
| `args.settings.crop_pos_x?` | `number` | `undefined` | - |
| `args.settings.crop_pos_y?` | `number` | `undefined` | - |
| `args.settings.depth_cutoff?` | ``0`` \| ``1`` | `undefined` | Whether or not to cutoff depth beyond a certain point. 0 for false, 1 for true |
| `args.settings.depth_inversion` | ``0`` \| ``1`` | `undefined` | Is the Depth inverted? 0 for false, 1 for true |
| `args.settings.depth_loc` | ``0`` \| ``2`` \| ``1`` \| ``3`` | `undefined` | Where are the holograms located? 0 Top 1 Bottom 2 Right 3 Left |
| `args.settings.depthiness` | `number` | `DEPTHINESS.range` | Depthiness can be a value between 0.1 and 2 |
| `args.settings.focus?` | `number` | `undefined` | Controls the Focus of the hologram |
| `args.settings.rows?` | `number` | `undefined` | - |
| `args.settings.tag?` | `string` | `undefined` | - |
| `args.settings.zoom` | `number` | `ZOOM.range` | Zoom can be between 0.1 and 2 |
| `args.uri` | `string` | `undefined` | - |

## Properties

### settings

• **settings**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `aspect` | `number` | Aspect Ratio of the hologram, this should match the source image you provide, not the RGBD Pair |
| `chroma_depth` | ``0`` \| ``1`` | Is the depth map chroma or grayscale? 0 for false, 1 for true |
| `columns?` | `number` | - |
| `crop_pos_x?` | `number` | - |
| `crop_pos_y?` | `number` | - |
| `depth_cutoff?` | ``0`` \| ``1`` | Whether or not to cutoff depth beyond a certain point. 0 for false, 1 for true |
| `depth_inversion` | ``0`` \| ``1`` | Is the Depth inverted? 0 for false, 1 for true |
| `depth_loc` | ``0`` \| ``2`` \| ``1`` \| ``3`` | Where are the holograms located? 0 Top 1 Bottom 2 Right 3 Left |
| `depthiness` | `number` | Depthiness can be a value between 0.1 and 2 |
| `focus?` | `number` | Controls the Focus of the hologram |
| `rows?` | `number` | - |
| `tag?` | `string` | - |
| `zoom` | `number` | Zoom can be between 0.1 and 2 |

___

### type

• **type**: ``"rgbd"``

___

### uri

• **uri**: `string`
