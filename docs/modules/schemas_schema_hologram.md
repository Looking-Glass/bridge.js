[@lookingglass/bridge](../README.md) / schemas/schema.hologram

# Module: schemas/schema.hologram

## Table of contents

### Interfaces

- [HologramClasses](../interfaces/schemas_schema_hologram.HologramClasses.md)

### Type Aliases

- [HologramSettings](schemas_schema_hologram.md#hologramsettings)
- [hologramTypes](schemas_schema_hologram.md#hologramtypes)

### Variables

- [QuiltHologramArgs](schemas_schema_hologram.md#quilthologramargs)
- [RGBDHologramArgs](schemas_schema_hologram.md#rgbdhologramargs)
- [hologramMap](schemas_schema_hologram.md#hologrammap)
- [hologramTypeSchema](schemas_schema_hologram.md#hologramtypeschema)

## Type Aliases

### HologramSettings

Ƭ **HologramSettings**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `quilt` | `z.infer`<typeof [`QuiltHologramArgs`](schemas_schema_hologram.md#quilthologramargs)\> |
| `rgbd` | `z.infer`<typeof [`RGBDHologramArgs`](schemas_schema_hologram.md#rgbdhologramargs)\> |

___

### hologramTypes

Ƭ **hologramTypes**: `z.infer`<typeof [`hologramTypeSchema`](schemas_schema_hologram.md#hologramtypeschema)\>

## Variables

### QuiltHologramArgs

• `Const` **QuiltHologramArgs**: `ZodObject`<{ `aspect`: `ZodNumber` ; `columns`: `ZodNumber` ; `rows`: `ZodNumber` ; `viewCount`: `ZodNumber`  }, ``"strip"``, `ZodTypeAny`, { `aspect`: `number` ; `columns`: `number` ; `rows`: `number` ; `viewCount`: `number`  }, { `aspect`: `number` ; `columns`: `number` ; `rows`: `number` ; `viewCount`: `number`  }\>

___

### RGBDHologramArgs

• `Const` **RGBDHologramArgs**: `ZodObject`<{ `aspect`: `ZodNumber` ; `chroma_depth`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `depth_cutoff`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``1``\>, `ZodLiteral`<``0``\>]\>\> ; `depth_inversion`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `depth_loc`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>, `ZodLiteral`<``2``\>, `ZodLiteral`<``3``\>]\> ; `depthiness`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = DEPTHINESS; `focus`: `ZodOptional`<`ZodNumber`\> ; `zoom`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = ZOOM }, ``"strip"``, `ZodTypeAny`, { `aspect`: `number` ; `chroma_depth`: ``0`` \| ``1`` ; `depth_cutoff?`: ``0`` \| ``1`` ; `depth_inversion`: ``0`` \| ``1`` ; `depth_loc`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness`: `number` = DEPTHINESS; `focus?`: `number` ; `zoom`: `number` = ZOOM }, { `aspect`: `number` ; `chroma_depth`: ``0`` \| ``1`` ; `depth_cutoff?`: ``0`` \| ``1`` ; `depth_inversion`: ``0`` \| ``1`` ; `depth_loc`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness`: `number` = DEPTHINESS; `focus?`: `number` ; `zoom`: `number` = ZOOM }\>

___

### hologramMap

• `Const` **hologramMap**: { [type in keyof HologramClasses]: any }

___

### hologramTypeSchema

• `Const` **hologramTypeSchema**: `ZodUnion`<[`ZodLiteral`<``"quilt"``\>, `ZodLiteral`<``"rgbd"``\>]\>