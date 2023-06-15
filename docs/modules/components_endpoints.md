[@lookingglass/bridge](../README.md) / components/endpoints

# Module: components/endpoints

## Table of contents

### Type Aliases

- [BridgeEndpointSchemaMap](components_endpoints.md#bridgeendpointschemamap)
- [BridgeEndpointType](components_endpoints.md#bridgeendpointtype)
- [BridgeRequestBodyMap](components_endpoints.md#bridgerequestbodymap)
- [ErrorResponse](components_endpoints.md#errorresponse)
- [Response](components_endpoints.md#response)
- [SuccessResponse](components_endpoints.md#successresponse)

### Functions

- [sendMessage](components_endpoints.md#sendmessage)

## Type Aliases

### BridgeEndpointSchemaMap

Ƭ **BridgeEndpointSchemaMap**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `api_version` | `z.infer`<typeof [`version`](schemas_responses.md#version)\> |
| `available_output_devices` | `z.infer`<typeof [`available_output_devices`](schemas_responses.md#available_output_devices)\> |
| `bridge_version` | `z.infer`<typeof [`version`](schemas_responses.md#version)\> |
| `delete_playlist` | `z.infer`<typeof [`delete_playlist`](schemas_responses.md#delete_playlist)\> |
| `enter_orchestration` | `z.infer`<typeof [`orchestration`](schemas_responses.md#orchestration)\> |
| `exit_orchestration` | `z.infer`<typeof [`orchestration`](schemas_responses.md#orchestration)\> |
| `insert_playlist_entry` | `z.infer`<typeof [`insert_playlist_entry`](schemas_responses.md#insert_playlist_entry)\> |
| `instance_playlist` | `z.infer`<typeof [`instance_playlist`](schemas_responses.md#instance_playlist)\> |
| `play_playlist` | `z.infer`<typeof [`play_playlist`](schemas_responses.md#play_playlist)\> |
| `show_window` | `z.infer`<typeof [`show_window`](schemas_responses.md#show_window)\> |

___

### BridgeEndpointType

Ƭ **BridgeEndpointType**: ``"instance_studio_playlist"`` \| ``"bridge_version"`` \| ``"api_version"`` \| ``"set_named_autostart_playlist"`` \| ``"set_autostart_playlist"`` \| ``"available_output_devices"`` \| ``"enter_orchestration"`` \| ``"exit_orchestration"`` \| ``"instance_playlist"`` \| ``"delete_playlist"`` \| ``"insert_playlist_entry"`` \| ``"update_playlist_entry"`` \| ``"update_current_entry"`` \| ``"sync_overwrite_playlist"`` \| ``"cancel_pending"`` \| ``"synced_file_hash"`` \| ``"transport_control_play"`` \| ``"transport_control_pause"`` \| ``"transport_control_next"`` \| ``"transport_control_previous"`` \| ``"transport_control_seek_to_index"`` \| ``"play_playlist"`` \| ``"show_window"``

___

### BridgeRequestBodyMap

Ƭ **BridgeRequestBodyMap**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `api_version` | `z.infer`<typeof [`version`](schemas_requests.md#version)\> |
| `available_output_devices` | `z.infer`<typeof [`available_output_devices`](schemas_requests.md#available_output_devices)\> |
| `bridge_version` | `z.infer`<typeof [`version`](schemas_requests.md#version)\> |
| `delete_playlist` | `z.infer`<typeof [`delete_playlist`](schemas_requests.md#delete_playlist)\> |
| `enter_orchestration` | `z.infer`<typeof [`orchestration`](schemas_requests.md#orchestration)\> |
| `exit_orchestration` | `z.infer`<typeof [`orchestration`](schemas_requests.md#orchestration)\> |
| `insert_playlist_entry` | `z.infer`<typeof [`insert_playlist_entry`](schemas_requests.md#insert_playlist_entry)\> |
| `instance_playlist` | `z.infer`<typeof [`instance_playlist`](schemas_requests.md#instance_playlist)\> |
| `play_playlist` | `z.infer`<typeof [`play_playlist`](schemas_requests.md#play_playlist)\> |
| `show_window` | `z.infer`<typeof [`show_window`](schemas_requests.md#show_window)\> |

___

### ErrorResponse

Ƭ **ErrorResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `response` | ``null`` |
| `success` | ``false`` |

___

### Response

Ƭ **Response**<`T`\>: [`SuccessResponse`](components_endpoints.md#successresponse)<`T`\> \| [`ErrorResponse`](components_endpoints.md#errorresponse)

#### Type parameters

| Name |
| :------ |
| `T` |

___

### SuccessResponse

Ƭ **SuccessResponse**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `response` | `T` |
| `success` | ``true`` |

## Functions

### sendMessage

▸ **sendMessage**<`T`\>(`params`): `Promise`<[`Response`](components_endpoints.md#response)<[`BridgeEndpointSchemaMap`](components_endpoints.md#bridgeendpointschemamap)[`T`]\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"show_window"`` \| ``"instance_playlist"`` \| ``"bridge_version"`` \| ``"api_version"`` \| ``"available_output_devices"`` \| ``"enter_orchestration"`` \| ``"exit_orchestration"`` \| ``"delete_playlist"`` \| ``"insert_playlist_entry"`` \| ``"play_playlist"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.baseUrl?` | `string` |
| `params.endpoint` | `T` |
| `params.requestBody` | [`BridgeRequestBodyMap`](components_endpoints.md#bridgerequestbodymap)[`T`] |

#### Returns

`Promise`<[`Response`](components_endpoints.md#response)<[`BridgeEndpointSchemaMap`](components_endpoints.md#bridgeendpointschemamap)[`T`]\>\>

the response from the bridge endpoint, as a json object
