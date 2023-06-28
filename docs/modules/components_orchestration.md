[@lookingglass/bridge](../README.md) / components/orchestration

# Module: components/orchestration

## Table of contents

### Interfaces

- [OrchestrationArgs](../interfaces/components_orchestration.OrchestrationArgs.md)

### Functions

- [tryEnterOrchestration](components_orchestration.md#tryenterorchestration)
- [tryExitOrchestration](components_orchestration.md#tryexitorchestration)

## Functions

### tryEnterOrchestration

▸ **tryEnterOrchestration**(`name`): `Promise`<{ `response`: `z.infer`<typeof [`orchestration`](schemas_schema_responses.md#orchestration)\> \| ``null`` ; `success`: `boolean`  }\>

this function will attempt to enter an orchestration

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | [`OrchestrationArgs`](../interfaces/components_orchestration.OrchestrationArgs.md) |

#### Returns

`Promise`<{ `response`: `z.infer`<typeof [`orchestration`](schemas_schema_responses.md#orchestration)\> \| ``null`` ; `success`: `boolean`  }\>

___

### tryExitOrchestration

▸ **tryExitOrchestration**(`orchestration`): `Promise`<{ `response`: `z.infer`<typeof [`orchestration`](schemas_schema_responses.md#orchestration)\> \| ``null`` ; `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orchestration` | `string` |

#### Returns

`Promise`<{ `response`: `z.infer`<typeof [`orchestration`](schemas_schema_responses.md#orchestration)\> \| ``null`` ; `success`: `boolean`  }\>
