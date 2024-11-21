[@lookingglass/bridge](../README.md) / schemas/schema.parameters

# Module: schemas/schema.parameters

## Table of contents

### Type Aliases

- [HologramParamMap](schemas_schema_parameters.md#hologramparammap)

### Variables

- [hologramParamMap](schemas_schema_parameters.md#hologramparammap-1)
- [parameterNames](schemas_schema_parameters.md#parameternames)

## Type Aliases

### HologramParamMap

Ƭ **HologramParamMap**: `z.infer`<typeof [`hologramParamMap`](schemas_schema_parameters.md#hologramparammap-1)\>

## Variables

### hologramParamMap

• `Const` **hologramParamMap**: `ZodObject`<{ `antiAliasingStrength`: `ZodOptional`<`ZodNumber`\> ; `aspect`: `ZodOptional`<`ZodNumber`\> ; `chroma_depth`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `cols`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_x`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_y`: `ZodOptional`<`ZodNumber`\> ; `depth_cutoff`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``1``\>, `ZodLiteral`<``0``\>]\>\> ; `depth_inversion`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `depth_loc`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>, `ZodLiteral`<``2``\>, `ZodLiteral`<``3``\>]\> ; `depthiness`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = DEPTHINESS.range; `filter_mode`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = FILTER\_MODE.range; `focus`: `ZodOptional`<`ZodNumber`\> ; `gaussian_sigma`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = GAUSSIAN\_SIGMA.range; `rows`: `ZodOptional`<`ZodNumber`\> ; `zoom`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = ZOOM.range }, ``"strip"``, `ZodTypeAny`, { `antiAliasingStrength?`: `number` ; `aspect?`: `number` ; `chroma_depth`: ``0`` \| ``1`` ; `cols?`: `number` ; `crop_pos_x?`: `number` ; `crop_pos_y?`: `number` ; `depth_cutoff?`: ``0`` \| ``1`` ; `depth_inversion`: ``0`` \| ``1`` ; `depth_loc`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness`: `number` = DEPTHINESS.range; `filter_mode`: `number` = FILTER\_MODE.range; `focus?`: `number` ; `gaussian_sigma`: `number` = GAUSSIAN\_SIGMA.range; `rows?`: `number` ; `zoom`: `number` = ZOOM.range }, { `antiAliasingStrength?`: `number` ; `aspect?`: `number` ; `chroma_depth`: ``0`` \| ``1`` ; `cols?`: `number` ; `crop_pos_x?`: `number` ; `crop_pos_y?`: `number` ; `depth_cutoff?`: ``0`` \| ``1`` ; `depth_inversion`: ``0`` \| ``1`` ; `depth_loc`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness`: `number` = DEPTHINESS.range; `filter_mode`: `number` = FILTER\_MODE.range; `focus?`: `number` ; `gaussian_sigma`: `number` = GAUSSIAN\_SIGMA.range; `rows?`: `number` ; `zoom`: `number` = ZOOM.range }\>

___

### parameterNames

• `Const` **parameterNames**: `ZodUnion`<[`ZodLiteral`<``"focus"``\>, `ZodLiteral`<``"aspect"``\>, `ZodLiteral`<``"cols"``\>, `ZodLiteral`<``"rows"``\>, `ZodLiteral`<``"crop_pos_x"``\>, `ZodLiteral`<``"crop_pos_y"``\>, `ZodLiteral`<``"zoom"``\>]\>
