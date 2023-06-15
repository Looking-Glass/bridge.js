[@lookingglass/bridge](../README.md) / schemas/schema

# Module: schemas/schema

## Table of contents

### Variables

- [completion](schemas_schema.md#completion)
- [failure](schemas_schema.md#failure)
- [float](schemas_schema.md#float)
- [int](schemas_schema.md#int)
- [int2](schemas_schema.md#int2)
- [name](schemas_schema.md#name)
- [pending](schemas_schema.md#pending)
- [status](schemas_schema.md#status)
- [unknown](schemas_schema.md#unknown)
- [unsigned\_int](schemas_schema.md#unsigned_int)
- [variant\_map](schemas_schema.md#variant_map)
- [wstring](schemas_schema.md#wstring)

## Variables

### completion

• `Const` **completion**: `ZodLiteral`<``"Completion"``\>

___

### failure

• `Const` **failure**: `ZodLiteral`<``"Failure"``\>

___

### float

• `Const` **float**: `ZodLiteral`<``"FLOAT"``\>

___

### int

• `Const` **int**: `ZodLiteral`<``"INT"``\>

___

### int2

• `Const` **int2**: `ZodLiteral`<``"INT2"``\>

___

### name

• `Const` **name**: `ZodString`

___

### pending

• `Const` **pending**: `ZodLiteral`<``"Pending"``\>

___

### status

• `Const` **status**: `ZodObject`<{ `name`: `ZodString` = name; `type`: `ZodLiteral`<``"WSTRING"``\> = wstring; `value`: `ZodUnion`<[`ZodLiteral`<``"Completion"``\>, `ZodLiteral`<``"Pending"``\>, `ZodLiteral`<``"Failure"``\>, `ZodLiteral`<``"UnknownOrchestration"``\>]\>  }, ``"strip"``, `ZodTypeAny`, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }, { `name`: `string` = name; `type`: ``"WSTRING"`` = wstring; `value`: ``"Completion"`` \| ``"Pending"`` \| ``"Failure"`` \| ``"UnknownOrchestration"``  }\>

___

### unknown

• `Const` **unknown**: `ZodLiteral`<``"UnknownOrchestration"``\>

___

### unsigned\_int

• `Const` **unsigned\_int**: `ZodLiteral`<``"UNSIGNED_INT"``\>

___

### variant\_map

• `Const` **variant\_map**: `ZodLiteral`<``"VARIANT_MAP"``\>

___

### wstring

• `Const` **wstring**: `ZodLiteral`<``"WSTRING"``\>
