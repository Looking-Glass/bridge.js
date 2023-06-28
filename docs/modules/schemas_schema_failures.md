[@lookingglass/bridge](../README.md) / schemas/schema.failures

# Module: schemas/schema.failures

## Table of contents

### Variables

- [play\_playist\_failure](schemas_schema_failures.md#play_playist_failure)

## Variables

### play\_playist\_failure

• `Const` **play\_playist\_failure**: `ZodObject`<{ `name`: `ZodString` ; `orchestration`: `ZodObject`<{ `name`: `ZodString` ; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` ; `type`: ``"WSTRING"`` = wstring; `value`: `string`  }, { `name`: `string` ; `type`: ``"WSTRING"`` = wstring; `value`: `string`  }\> ; `payload`: `ZodObject`<{ `name`: `ZodString` ; `type`: `ZodLiteral`<``"VARIANT_MAP"``\> = variant\_map; `value`: `ZodObject`<{ `message`: `ZodObject`<{ `name`: `ZodString` ; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` ; `type`: ``"WSTRING"`` = wstring; `value`: `string`  }, { `name`: `string` ; `type`: ``"WSTRING"`` = wstring; `value`: `string`  }\>  }, ``"strip"``, `ZodTypeAny`, { `message`: { value: string; type: "WSTRING"; name: string; }  }, { `message`: { value: string; type: "WSTRING"; name: string; }  }\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` ; `type`: ``"VARIANT_MAP"`` = variant\_map; `value`: { message: { value: string; type: "WSTRING"; name: string; }; }  }, { `name`: `string` ; `type`: ``"VARIANT_MAP"`` = variant\_map; `value`: { message: { value: string; type: "WSTRING"; name: string; }; }  }\> ; `status`: `ZodObject`<{ `name`: `ZodString` = name; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodUnion`<[`ZodLiteral`<``"Completion"``\>, `ZodLiteral`<``"Pending"``\>, `ZodLiteral`<``"Failure"``\>, `ZodLiteral`<``"UnknownOrchestration"``\>]\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }\> = status }, ``"strip"``, `ZodTypeAny`, { `name`: `string` ; `orchestration`: { value: string; type: "WSTRING"; name: string; } ; `payload`: { value: { message: { value: string; type: "WSTRING"; name: string; }; }; type: "VARIANT\_MAP"; name: string; } ; `status`: { value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; type: "WSTRING"; name: string; } = status }, { `name`: `string` ; `orchestration`: { value: string; type: "WSTRING"; name: string; } ; `payload`: { value: { message: { value: string; type: "WSTRING"; name: string; }; }; type: "VARIANT\_MAP"; name: string; } ; `status`: { value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; type: "WSTRING"; name: string; } = status }\>
