[@lookingglass/bridge.js](../README.md) / components/orchestration

# Module: components/orchestration

## Table of contents

### Interfaces

- [OrchestrationArgs](../interfaces/components_orchestration.OrchestrationArgs.md)

### Functions

- [tryEnterOrchestration](components_orchestration.md#tryenterorchestration)
- [tryExitOrchestration](components_orchestration.md#tryexitorchestration)

## Functions

### tryEnterOrchestration

▸ **tryEnterOrchestration**(`name`): `Promise`<`string` \| ``false``\>

this function will attempt to enter an orchestration

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | [`OrchestrationArgs`](../interfaces/components_orchestration.OrchestrationArgs.md) |

#### Returns

`Promise`<`string` \| ``false``\>

___

### tryExitOrchestration

▸ **tryExitOrchestration**(`orchestration`): `Promise`<``false`` \| [`SuccessResponse`](components_endpoints.md#successresponse)<{ `name`: `string` = schema.name; `payload`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orchestration` | `string` |

#### Returns

`Promise`<``false`` \| [`SuccessResponse`](components_endpoints.md#successresponse)<{ `name`: `string` = schema.name; `payload`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }\>\>
