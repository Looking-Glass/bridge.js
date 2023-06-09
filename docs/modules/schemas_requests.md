[@lookingglass/bridge.js](../README.md) / schemas/requests

# Module: schemas/requests

## Table of contents

### Variables

- [available\_output\_devices](schemas_requests.md#available_output_devices)
- [delete\_playlist](schemas_requests.md#delete_playlist)
- [insert\_playlist\_entry](schemas_requests.md#insert_playlist_entry)
- [instance\_playlist](schemas_requests.md#instance_playlist)
- [orchestration](schemas_requests.md#orchestration)
- [play\_playlist](schemas_requests.md#play_playlist)
- [show\_window](schemas_requests.md#show_window)
- [version](schemas_requests.md#version)

## Variables

### available\_output\_devices

• `Const` **available\_output\_devices**: `ZodObject`<{ `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `orchestration`: `string`  }, { `orchestration`: `string`  }\>

___

### delete\_playlist

• `Const` **delete\_playlist**: `ZodObject`<{ `loop`: `ZodBoolean` ; `name`: `ZodString` ; `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `loop`: `boolean` ; `name`: `string` ; `orchestration`: `string`  }, { `loop`: `boolean` ; `name`: `string` ; `orchestration`: `string`  }\>

___

### insert\_playlist\_entry

• `Const` **insert\_playlist\_entry**: `ZodObject`<{ `aspect`: `ZodNumber` ; `chroma_depth`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\>\> ; `cols`: `ZodNumber` ; `depth_inversion`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\>\> ; `depth_loc`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>, `ZodLiteral`<``2``\>, `ZodLiteral`<``3``\>]\>\> ; `depthiness`: `ZodOptional`<`ZodNumber`\> ; `id`: `ZodNumber` ; `index`: `ZodNumber` ; `isRGBD`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `name`: `ZodString` ; `orchestration`: `ZodString` ; `rows`: `ZodNumber` ; `uri`: `ZodString` ; `view_count`: `ZodNumber` ; `zoom`: `ZodOptional`<`ZodNumber`\>  }, ``"strip"``, `ZodTypeAny`, { `aspect`: `number` ; `chroma_depth?`: ``0`` \| ``1`` ; `cols`: `number` ; `depth_inversion?`: ``0`` \| ``1`` ; `depth_loc?`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness?`: `number` ; `id`: `number` ; `index`: `number` ; `isRGBD`: ``0`` \| ``1`` ; `name`: `string` ; `orchestration`: `string` ; `rows`: `number` ; `uri`: `string` ; `view_count`: `number` ; `zoom?`: `number`  }, { `aspect`: `number` ; `chroma_depth?`: ``0`` \| ``1`` ; `cols`: `number` ; `depth_inversion?`: ``0`` \| ``1`` ; `depth_loc?`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness?`: `number` ; `id`: `number` ; `index`: `number` ; `isRGBD`: ``0`` \| ``1`` ; `name`: `string` ; `orchestration`: `string` ; `rows`: `number` ; `uri`: `string` ; `view_count`: `number` ; `zoom?`: `number`  }\>

___

### instance\_playlist

• `Const` **instance\_playlist**: `ZodObject`<{ `loop`: `ZodBoolean` ; `name`: `ZodString` ; `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `loop`: `boolean` ; `name`: `string` ; `orchestration`: `string`  }, { `loop`: `boolean` ; `name`: `string` ; `orchestration`: `string`  }\>

___

### orchestration

• `Const` **orchestration**: `ZodObject`<{}, ``"strict"``, `ZodTypeAny`, {}, {}\>

___

### play\_playlist

• `Const` **play\_playlist**: `ZodObject`<{ `head_index`: `ZodNumber` ; `name`: `ZodString` ; `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `head_index`: `number` ; `name`: `string` ; `orchestration`: `string`  }, { `head_index`: `number` ; `name`: `string` ; `orchestration`: `string`  }\>

___

### show\_window

• `Const` **show\_window**: `ZodObject`<{ `head_index`: `ZodNumber` ; `orchestration`: `ZodString` ; `show_window`: `ZodBoolean`  }, ``"strip"``, `ZodTypeAny`, { `head_index`: `number` ; `orchestration`: `string` ; `show_window`: `boolean`  }, { `head_index`: `number` ; `orchestration`: `string` ; `show_window`: `boolean`  }\>

___

### version

• `Const` **version**: `ZodObject`<{}, ``"strict"``, `ZodTypeAny`, {}, {}\>
