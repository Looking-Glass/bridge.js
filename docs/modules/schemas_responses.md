[@lookingglass/bridge](../README.md) / schemas/responses

# Module: schemas/responses

## Table of contents

### Variables

- [available\_output\_devices](schemas_responses.md#available_output_devices)
- [delete\_playlist](schemas_responses.md#delete_playlist)
- [insert\_playlist\_entry](schemas_responses.md#insert_playlist_entry)
- [instance\_playlist](schemas_responses.md#instance_playlist)
- [orchestration](schemas_responses.md#orchestration)
- [play\_playlist](schemas_responses.md#play_playlist)
- [show\_window](schemas_responses.md#show_window)
- [version](schemas_responses.md#version)

## Variables

### available\_output\_devices

• `Const` **available\_output\_devices**: `ZodObject`<{ `name`: `ZodString` = schema.name; `orchestration`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `payload`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"VARIANT_MAP"``\> = schema.variant\_map; `value`: `ZodOptional`<`ZodRecord`<`ZodString`, `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"VARIANT_MAP"``\> = schema.variant\_map; `value`: `ZodObject`<{ `calibration`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `defaultQuilt`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `hardwareVersion`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `hwid`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `index`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"UNSIGNED_INT"``\> = schema.unsigned\_int; `value`: `ZodNumber`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"UNSIGNED_INT"`` = schema.unsigned\_int; `value`: `number`  }, { `name`: `string` = schema.name; `type`: ``"UNSIGNED_INT"`` = schema.unsigned\_int; `value`: `number`  }\> ; `state`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `windowCoords`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"INT2"``\> = schema.int2; `value`: `ZodObject`<{ `x`: `ZodNumber` ; `y`: `ZodNumber`  }, ``"strip"``, `ZodTypeAny`, { `x`: `number` ; `y`: `number`  }, { `x`: `number` ; `y`: `number`  }\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"INT2"`` = schema.int2; `value`: { x: number; y: number; }  }, { `name`: `string` = schema.name; `type`: ``"INT2"`` = schema.int2; `value`: { x: number; y: number; }  }\>  }, ``"strip"``, `ZodTypeAny`, { `calibration`: { type: "WSTRING"; value: string; name: string; } ; `defaultQuilt`: { type: "WSTRING"; value: string; name: string; } ; `hardwareVersion`: { type: "WSTRING"; value: string; name: string; } ; `hwid`: { type: "WSTRING"; value: string; name: string; } ; `index`: { type: "UNSIGNED\_INT"; value: number; name: string; } ; `state`: { type: "WSTRING"; value: string; name: string; } ; `windowCoords`: { type: "INT2"; value: { x: number; y: number; }; name: string; }  }, { `calibration`: { type: "WSTRING"; value: string; name: string; } ; `defaultQuilt`: { type: "WSTRING"; value: string; name: string; } ; `hardwareVersion`: { type: "WSTRING"; value: string; name: string; } ; `hwid`: { type: "WSTRING"; value: string; name: string; } ; `index`: { type: "UNSIGNED\_INT"; value: number; name: string; } ; `state`: { type: "WSTRING"; value: string; name: string; } ; `windowCoords`: { type: "INT2"; value: { x: number; y: number; }; name: string; }  }\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value`: { index: { type: "UNSIGNED\_INT"; value: number; name: string; }; calibration: { type: "WSTRING"; value: string; name: string; }; defaultQuilt: { type: "WSTRING"; value: string; name: string; }; hardwareVersion: { ...; }; hwid: { ...; }; state: { ...; }; windowCoords: { ...; }; }  }, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value`: { index: { type: "UNSIGNED\_INT"; value: number; name: string; }; calibration: { type: "WSTRING"; value: string; name: string; }; defaultQuilt: { type: "WSTRING"; value: string; name: string; }; hardwareVersion: { ...; }; hwid: { ...; }; state: { ...; }; windowCoords: { ...; }; }  }\>\>\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value?`: `Record`<`string`, { type: "VARIANT\_MAP"; value: { index: { type: "UNSIGNED\_INT"; value: number; name: string; }; calibration: { type: "WSTRING"; value: string; name: string; }; defaultQuilt: { type: "WSTRING"; value: string; name: string; }; hardwareVersion: { ...; }; hwid: { ...; }; state: { ...; }; windowCoords: { ...; }; }; name: ...\>  }, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value?`: `Record`<`string`, { type: "VARIANT\_MAP"; value: { index: { type: "UNSIGNED\_INT"; value: number; name: string; }; calibration: { type: "WSTRING"; value: string; name: string; }; defaultQuilt: { type: "WSTRING"; value: string; name: string; }; hardwareVersion: { ...; }; hwid: { ...; }; state: { ...; }; windowCoords: { ...; }; }; name: ...\>  }\> ; `status`: `ZodObject`<{ `name`: `ZodString` = name; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodUnion`<[`ZodLiteral`<``"Completion"``\>, `ZodLiteral`<``"Pending"``\>, `ZodLiteral`<``"Failure"``\>, `ZodLiteral`<``"UnknownOrchestration"``\>]\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }\> = schema.status }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; name: string; value?: Record<string, { type: "VARIANT\_MAP"; value: { index: { type: "UNSIGNED\_INT"; value: number; name: string; }; calibration: { type: "WSTRING"; value: string; name: string; }; ... 4 more ...; windowCoords: { ...; }; }; name: string; }\> \| undefined; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; name: string; value?: Record<string, { type: "VARIANT\_MAP"; value: { index: { type: "UNSIGNED\_INT"; value: number; name: string; }; calibration: { type: "WSTRING"; value: string; name: string; }; ... 4 more ...; windowCoords: { ...; }; }; name: string; }\> \| undefined; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }\>

___

### delete\_playlist

• `Const` **delete\_playlist**: `ZodObject`<{ `name`: `ZodString` = schema.name; `orchestration`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `payload`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"VARIANT_MAP"``\> = schema.variant\_map; `value`: `ZodObject`<{ `name`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\>  }, ``"strip"``, `ZodTypeAny`, { `name`: { type: "WSTRING"; value: string; name: string; }  }, { `name`: { type: "WSTRING"; value: string; name: string; }  }\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value`: { name: { type: "WSTRING"; value: string; name: string; }; }  }, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value`: { name: { type: "WSTRING"; value: string; name: string; }; }  }\> ; `status`: `ZodObject`<{ `name`: `ZodString` = name; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodUnion`<[`ZodLiteral`<``"Completion"``\>, `ZodLiteral`<``"Pending"``\>, `ZodLiteral`<``"Failure"``\>, `ZodLiteral`<``"UnknownOrchestration"``\>]\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }\> = schema.status }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { name: { type: "WSTRING"; value: string; name: string; }; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { name: { type: "WSTRING"; value: string; name: string; }; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }\>

___

### insert\_playlist\_entry

• `Const` **insert\_playlist\_entry**: `ZodObject`<{ `name`: `ZodString` = schema.name; `orchestration`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `payload`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"VARIANT_MAP"``\> = schema.variant\_map; `value`: `ZodObject`<{ `index`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\>  }, ``"strip"``, `ZodTypeAny`, { `index`: { type: "WSTRING"; value: string; name: string; }  }, { `index`: { type: "WSTRING"; value: string; name: string; }  }\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value`: { index: { type: "WSTRING"; value: string; name: string; }; }  }, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value`: { index: { type: "WSTRING"; value: string; name: string; }; }  }\> ; `status`: `ZodObject`<{ `name`: `ZodString` = name; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodUnion`<[`ZodLiteral`<``"Completion"``\>, `ZodLiteral`<``"Pending"``\>, `ZodLiteral`<``"Failure"``\>, `ZodLiteral`<``"UnknownOrchestration"``\>]\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }\> = schema.status }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { index: { type: "WSTRING"; value: string; name: string; }; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { index: { type: "WSTRING"; value: string; name: string; }; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }\>

___

### instance\_playlist

• `Const` **instance\_playlist**: `ZodObject`<{ `name`: `ZodString` = schema.name; `orchestration`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `payload`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"VARIANT_MAP"``\> = schema.variant\_map; `value`: `ZodObject`<{ `name`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\>  }, ``"strip"``, `ZodTypeAny`, { `name`: { type: "WSTRING"; value: string; name: string; }  }, { `name`: { type: "WSTRING"; value: string; name: string; }  }\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value`: { name: { type: "WSTRING"; value: string; name: string; }; }  }, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value`: { name: { type: "WSTRING"; value: string; name: string; }; }  }\> ; `status`: `ZodObject`<{ `name`: `ZodString` = name; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodUnion`<[`ZodLiteral`<``"Completion"``\>, `ZodLiteral`<``"Pending"``\>, `ZodLiteral`<``"Failure"``\>, `ZodLiteral`<``"UnknownOrchestration"``\>]\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }\> = schema.status }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { name: { type: "WSTRING"; value: string; name: string; }; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { name: { type: "WSTRING"; value: string; name: string; }; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }\>

___

### orchestration

• `Const` **orchestration**: `ZodObject`<{ `name`: `ZodString` = schema.name; `payload`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `status`: `ZodObject`<{ `name`: `ZodString` = name; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodUnion`<[`ZodLiteral`<``"Completion"``\>, `ZodLiteral`<``"Pending"``\>, `ZodLiteral`<``"Failure"``\>, `ZodLiteral`<``"UnknownOrchestration"``\>]\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }\> = schema.status }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `payload`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }, { `name`: `string` = schema.name; `payload`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }\>

___

### play\_playlist

• `Const` **play\_playlist**: `ZodObject`<{ `name`: `ZodString` = schema.name; `orchestration`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `payload`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"VARIANT_MAP"``\> = schema.variant\_map; `value`: `ZodObject`<{ `id`: `ZodOptional`<`ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\>\> ; `message`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\>  }, ``"strip"``, `ZodTypeAny`, { `id?`: { type: "WSTRING"; value: string; name: string; } ; `message`: { type: "WSTRING"; value: string; name: string; }  }, { `id?`: { type: "WSTRING"; value: string; name: string; } ; `message`: { type: "WSTRING"; value: string; name: string; }  }\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value`: { message: { type: "WSTRING"; value: string; name: string; }; id?: { type: "WSTRING"; value: string; name: string; } \| undefined; }  }, { `name`: `string` = schema.name; `type`: ``"VARIANT_MAP"`` = schema.variant\_map; `value`: { message: { type: "WSTRING"; value: string; name: string; }; id?: { type: "WSTRING"; value: string; name: string; } \| undefined; }  }\> ; `status`: `ZodObject`<{ `name`: `ZodString` = name; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodUnion`<[`ZodLiteral`<``"Completion"``\>, `ZodLiteral`<``"Pending"``\>, `ZodLiteral`<``"Failure"``\>, `ZodLiteral`<``"UnknownOrchestration"``\>]\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }\> = schema.status }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { message: { type: "WSTRING"; value: string; name: string; }; id?: { type: "WSTRING"; value: string; name: string; } \| undefined; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { message: { type: "WSTRING"; value: string; name: string; }; id?: { type: "WSTRING"; value: string; name: string; } \| undefined; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }\>

___

### show\_window

• `Const` **show\_window**: `ZodObject`<{ `name`: `ZodString` = schema.name; `orchestration`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `status`: `ZodObject`<{ `name`: `ZodString` = name; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodUnion`<[`ZodLiteral`<``"Completion"``\>, `ZodLiteral`<``"Pending"``\>, `ZodLiteral`<``"Failure"``\>, `ZodLiteral`<``"UnknownOrchestration"``\>]\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }\> = schema.status }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }, { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }\>

___

### version

• `Const` **version**: `ZodObject`<{ `name`: `ZodString` = schema.name; `payload`: `ZodObject`<{ `name`: `ZodString` = schema.name; `type`: `ZodLiteral`<``"WSTRING"``\> = schema.wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }, { `name`: `string` = schema.name; `type`: ``"WSTRING"`` = schema.wstring; `value`: `string`  }\> ; `status`: `ZodObject`<{ `name`: `ZodString` = name; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodUnion`<[`ZodLiteral`<``"Completion"``\>, `ZodLiteral`<``"Pending"``\>, `ZodLiteral`<``"Failure"``\>, `ZodLiteral`<``"UnknownOrchestration"``\>]\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }\> = schema.status }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = schema.name; `payload`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }, { `name`: `string` = schema.name; `payload`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status }\>