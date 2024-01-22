[@lookingglass/bridge](../README.md) / schemas/schema.failures

# Module: schemas/schema.failures

## Table of contents

### Variables

- [play\_playist\_failure](schemas_schema_failures.md#play_playist_failure)

## Variables

### play\_playist\_failure

• `Const` **play\_playist\_failure**: `ZodObject`<{ `name`: `ZodString` ; `orchestration`: `ZodObject`<{ `name`: `ZodString` ; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` ; `type`: ``"WSTRING"`` = wstring; `value`: `string`  }, { `name`: `string` ; `type`: ``"WSTRING"`` = wstring; `value`: `string`  }\> ; `payload`: `ZodObject`<{ `name`: `ZodString` ; `type`: `ZodLiteral`<``"VARIANT_MAP"``\> = variant\_map; `value`: `ZodObject`<{ `message`: `ZodObject`<{ `name`: `ZodString` ; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` ; `type`: ``"WSTRING"`` = wstring; `value`: `string`  }, { `name`: `string` ; `type`: ``"WSTRING"`` = wstring; `value`: `string`  }\>  }, ``"strip"``, `ZodTypeAny`, { `message`: { value: string; name: string; type: "WSTRING"; }  }, { `message`: { value: string; name: string; type: "WSTRING"; }  }\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` ; `type`: ``"VARIANT_MAP"`` = variant\_map; `value`: { message: { value: string; name: string; type: "WSTRING"; }; }  }, { `name`: `string` ; `type`: ``"VARIANT_MAP"`` = variant\_map; `value`: { message: { value: string; name: string; type: "WSTRING"; }; }  }\> ; `status`: `ZodObject`<{ `name`: `ZodString` = name; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodUnion`<[`ZodLiteral`<``"Completion"``\>, `ZodLiteral`<``"Pending"``\>, `ZodLiteral`<``"Failure"``\>, `ZodLiteral`<``"UnknownOrchestration"``\>]\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"UnknownOrchestration"`` \| ``"Pending"`` \| ``"Failure"``  }, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"UnknownOrchestration"`` \| ``"Pending"`` \| ``"Failure"``  }\> = status }, ``"strip"``, `ZodTypeAny`, { `name`: `string` ; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { message: { value: string; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = status }, { `name`: `string` ; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { message: { value: string; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = status }\>
