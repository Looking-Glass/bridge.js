[@lookingglass/bridge.js](../README.md) / components/hologram

# Module: components/hologram

## Table of contents

### Classes

- [QuiltHologram](../classes/components_hologram.QuiltHologram.md)
- [RGBDHologram](../classes/components_hologram.RGBDHologram.md)

### Type Aliases

- [Hologram](components_hologram.md#hologram)

### Variables

- [QuiltHologramArgs](components_hologram.md#quilthologramargs)
- [RGBDHologramArgs](components_hologram.md#rgbdhologramargs)

## Type Aliases

### Hologram

Ƭ **Hologram**: [`QuiltHologram`](../classes/components_hologram.QuiltHologram.md) \| [`RGBDHologram`](../classes/components_hologram.RGBDHologram.md)

## Variables

### QuiltHologramArgs

• `Const` **QuiltHologramArgs**: `ZodObject`<{ `aspect`: `ZodNumber` ; `columns`: `ZodNumber` ; `rows`: `ZodNumber` ; `viewCount`: `ZodNumber`  }, ``"strip"``, `ZodTypeAny`, { `aspect`: `number` ; `columns`: `number` ; `rows`: `number` ; `viewCount`: `number`  }, { `aspect`: `number` ; `columns`: `number` ; `rows`: `number` ; `viewCount`: `number`  }\>

___

### RGBDHologramArgs

• `Const` **RGBDHologramArgs**: `ZodObject`<{ `aspect`: `ZodNumber` ; `chroma_depth`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `columns`: `ZodNumber` ; `depth_cutoff`: `ZodOptional`<`ZodLiteral`<``1``\>\> ; `depth_inversion`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `depth_loc`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>, `ZodLiteral`<``2``\>, `ZodLiteral`<``3``\>]\> ; `depthiness`: `ZodNumber` ; `focus`: `ZodOptional`<`ZodNumber`\> ; `rows`: `ZodNumber` ; `viewCount`: `ZodNumber` ; `zoom`: `ZodOptional`<`ZodNumber`\>  }, ``"strip"``, `ZodTypeAny`, { `aspect`: `number` ; `chroma_depth`: ``0`` \| ``1`` ; `columns`: `number` ; `depth_cutoff?`: ``1`` ; `depth_inversion`: ``0`` \| ``1`` ; `depth_loc`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness`: `number` ; `focus?`: `number` ; `rows`: `number` ; `viewCount`: `number` ; `zoom?`: `number`  }, { `aspect`: `number` ; `chroma_depth`: ``0`` \| ``1`` ; `columns`: `number` ; `depth_cutoff?`: ``1`` ; `depth_inversion`: ``0`` \| ``1`` ; `depth_loc`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness`: `number` ; `focus?`: `number` ; `rows`: `number` ; `viewCount`: `number` ; `zoom?`: `number`  }\>
