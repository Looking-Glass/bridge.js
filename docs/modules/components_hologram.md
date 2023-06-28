[@lookingglass/bridge](../README.md) / components/hologram

# Module: components/hologram

## Table of contents

### Classes

- [QuiltHologram](../classes/components_hologram.QuiltHologram.md)
- [RGBDHologram](../classes/components_hologram.RGBDHologram.md)

### Type Aliases

- [HologramType](components_hologram.md#hologramtype)

### Functions

- [hologramFactory](components_hologram.md#hologramfactory)

## Type Aliases

### HologramType

Ƭ **HologramType**: [`QuiltHologram`](../classes/components_hologram.QuiltHologram.md) \| [`RGBDHologram`](../classes/components_hologram.RGBDHologram.md)

## Functions

### hologramFactory

▸ **hologramFactory**<`T`\>(`«destructured»`): [`QuiltHologram`](../classes/components_hologram.QuiltHologram.md) \| [`RGBDHologram`](../classes/components_hologram.RGBDHologram.md)

Allow the user to create a hologram manually based on type,
this is useful for when we want to allow the end user to create a hologram themselves via a UI interface

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`HologramClasses`](../interfaces/schemas_schema_hologram.HologramClasses.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `settings` | [`HologramSettings`](schemas_schema_hologram.md#hologramsettings)[`T`] |
| › `type` | `T` |
| › `uri` | `string` |

#### Returns

[`QuiltHologram`](../classes/components_hologram.QuiltHologram.md) \| [`RGBDHologram`](../classes/components_hologram.RGBDHologram.md)
