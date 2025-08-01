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

• `Const` **QuiltHologramArgs**: `ZodObject`<{ `aspect`: `ZodNumber` ; `columns`: `ZodNumber` ; `crop_pos_x`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_y`: `ZodOptional`<`ZodNumber`\> ; `duration`: `ZodOptional`<`ZodNumber`\> ; `focus`: `ZodOptional`<`ZodNumber`\> ; `rows`: `ZodNumber` ; `tag`: `ZodOptional`<`ZodString`\> ; `viewCount`: `ZodNumber` ; `zoom`: `ZodOptional`<`ZodNumber`\>  }, ``"strip"``, `ZodTypeAny`, { `aspect`: `number` ; `columns`: `number` ; `crop_pos_x?`: `number` ; `crop_pos_y?`: `number` ; `duration?`: `number` ; `focus?`: `number` ; `rows`: `number` ; `tag?`: `string` ; `viewCount`: `number` ; `zoom?`: `number`  }, { `aspect`: `number` ; `columns`: `number` ; `crop_pos_x?`: `number` ; `crop_pos_y?`: `number` ; `duration?`: `number` ; `focus?`: `number` ; `rows`: `number` ; `tag?`: `string` ; `viewCount`: `number` ; `zoom?`: `number`  }\>

___

### RGBDHologramArgs

• `Const` **RGBDHologramArgs**: `ZodObject`<{ `aspect`: `ZodNumber` ; `chroma_depth`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `columns`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_x`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_y`: `ZodOptional`<`ZodNumber`\> ; `depth_cutoff`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``1``\>, `ZodLiteral`<``0``\>]\>\> ; `depth_inversion`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `depth_loc`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>, `ZodLiteral`<``2``\>, `ZodLiteral`<``3``\>]\> ; `depthiness`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = DEPTHINESS.range; `duration`: `ZodOptional`<`ZodNumber`\> ; `focus`: `ZodOptional`<`ZodNumber`\> ; `rows`: `ZodOptional`<`ZodNumber`\> ; `tag`: `ZodOptional`<`ZodString`\> ; `zoom`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = ZOOM.range }, ``"strip"``, `ZodTypeAny`, { `aspect`: `number` ; `chroma_depth`: ``0`` \| ``1`` ; `columns?`: `number` ; `crop_pos_x?`: `number` ; `crop_pos_y?`: `number` ; `depth_cutoff?`: ``0`` \| ``1`` ; `depth_inversion`: ``0`` \| ``1`` ; `depth_loc`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness`: `number` = DEPTHINESS.range; `duration?`: `number` ; `focus?`: `number` ; `rows?`: `number` ; `tag?`: `string` ; `zoom`: `number` = ZOOM.range }, { `aspect`: `number` ; `chroma_depth`: ``0`` \| ``1`` ; `columns?`: `number` ; `crop_pos_x?`: `number` ; `crop_pos_y?`: `number` ; `depth_cutoff?`: ``0`` \| ``1`` ; `depth_inversion`: ``0`` \| ``1`` ; `depth_loc`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness`: `number` = DEPTHINESS.range; `duration?`: `number` ; `focus?`: `number` ; `rows?`: `number` ; `tag?`: `string` ; `zoom`: `number` = ZOOM.range }\>

___

### hologramMap

• `Const` **hologramMap**: { [type in keyof HologramClasses]: any }

___

### hologramTypeSchema

• `Const` **hologramTypeSchema**: `ZodUnion`<[`ZodLiteral`<``"quilt"``\>, `ZodLiteral`<``"rgbd"``\>]\>
