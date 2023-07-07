[@lookingglass/bridge](../README.md) / schemas/defaults

# Module: schemas/defaults

## Table of contents

### Variables

- [ASPECT](schemas_defaults.md#aspect)
- [DEPTHINESS](schemas_defaults.md#depthiness)
- [FOCUS](schemas_defaults.md#focus)
- [QUILT\_COLS](schemas_defaults.md#quilt_cols)
- [QUILT\_ROWS](schemas_defaults.md#quilt_rows)
- [QUILT\_VIEW\_COUNT](schemas_defaults.md#quilt_view_count)
- [ZOOM](schemas_defaults.md#zoom)

## Variables

### ASPECT

• `Const` **ASPECT**: `Object`

for certain values we need defaults in order to define our type schemas and also clamp values.
This helps prevent sending bridge values that are out of range.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `max` | `number` |
| `min` | `number` |
| `range` | `ZodEffects`<`ZodNumber`, `number`, `number`\> |

___

### DEPTHINESS

• `Const` **DEPTHINESS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `max` | `number` |
| `min` | `number` |
| `range` | `ZodEffects`<`ZodNumber`, `number`, `number`\> |

___

### FOCUS

• `Const` **FOCUS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `max` | `number` |
| `min` | `number` |
| `range` | `ZodEffects`<`ZodNumber`, `number`, `number`\> |

___

### QUILT\_COLS

• `Const` **QUILT\_COLS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `max` | `number` |
| `min` | `number` |
| `range` | `ZodEffects`<`ZodNumber`, `number`, `number`\> |

___

### QUILT\_ROWS

• `Const` **QUILT\_ROWS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `max` | `number` |
| `min` | `number` |
| `range` | `ZodEffects`<`ZodNumber`, `number`, `number`\> |

___

### QUILT\_VIEW\_COUNT

• `Const` **QUILT\_VIEW\_COUNT**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `max` | `number` |
| `min` | `number` |
| `range` | `ZodEffects`<`ZodNumber`, `number`, `number`\> |

___

### ZOOM

• `Const` **ZOOM**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `max` | `number` |
| `min` | `number` |
| `range` | `ZodEffects`<`ZodNumber`, `number`, `number`\> |
