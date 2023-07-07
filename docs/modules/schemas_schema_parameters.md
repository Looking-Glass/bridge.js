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

• `Const` **hologramParamMap**: `ZodObject`<{ `aspect`: `ZodNumber` ; `chroma_depth`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `columns`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = QUILT\_COLS.range; `depth_cutoff`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``1``\>, `ZodLiteral`<``0``\>]\>\> ; `depth_inversion`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `depth_loc`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>, `ZodLiteral`<``2``\>, `ZodLiteral`<``3``\>]\> ; `depthiness`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = DEPTHINESS.range; `focus`: `ZodOptional`<`ZodNumber`\> ; `rows`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = QUILT\_ROWS.range; `view_count`: `ZodNumber` ; `zoom`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = ZOOM.range }, ``"strip"``, `ZodTypeAny`, { `aspect`: `number` ; `chroma_depth`: ``0`` \| ``1`` ; `columns`: `number` = QUILT\_COLS.range; `depth_cutoff?`: ``0`` \| ``1`` ; `depth_inversion`: ``0`` \| ``1`` ; `depth_loc`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness`: `number` = DEPTHINESS.range; `focus?`: `number` ; `rows`: `number` = QUILT\_ROWS.range; `view_count`: `number` ; `zoom`: `number` = ZOOM.range }, { `aspect`: `number` ; `chroma_depth`: ``0`` \| ``1`` ; `columns`: `number` = QUILT\_COLS.range; `depth_cutoff?`: ``0`` \| ``1`` ; `depth_inversion`: ``0`` \| ``1`` ; `depth_loc`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness`: `number` = DEPTHINESS.range; `focus?`: `number` ; `rows`: `number` = QUILT\_ROWS.range; `view_count`: `number` ; `zoom`: `number` = ZOOM.range }\>

___

### parameterNames

• `Const` **parameterNames**: `ZodUnion`<[`ZodLiteral`<``"rows"``\>, `ZodLiteral`<``"columns"``\>, `ZodLiteral`<``"aspect"``\>, `ZodLiteral`<``"view_count"``\>, `ZodLiteral`<``"depth_loc"``\>, `ZodLiteral`<``"depth_inversion"``\>, `ZodLiteral`<``"chroma_depth"``\>]\>
