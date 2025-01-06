[@lookingglass/bridge](../README.md) / schemas/schema.requests

# Module: schemas/schema.requests

## Table of contents

### Variables

- [available\_output\_devices](schemas_schema_requests.md#available_output_devices)
- [delete\_playlist](schemas_schema_requests.md#delete_playlist)
- [get\_autostart\_playlist](schemas_schema_requests.md#get_autostart_playlist)
- [insert\_playlist\_entry](schemas_schema_requests.md#insert_playlist_entry)
- [instance\_playlist](schemas_schema_requests.md#instance_playlist)
- [instance\_studio\_playlist](schemas_schema_requests.md#instance_studio_playlist)
- [orchestration](schemas_schema_requests.md#orchestration)
- [play\_playlist](schemas_schema_requests.md#play_playlist)
- [set\_autostart\_playlist](schemas_schema_requests.md#set_autostart_playlist)
- [set\_named\_autostart\_playlist](schemas_schema_requests.md#set_named_autostart_playlist)
- [show\_window](schemas_schema_requests.md#show_window)
- [transport\_control\_next](schemas_schema_requests.md#transport_control_next)
- [transport\_control\_pause](schemas_schema_requests.md#transport_control_pause)
- [transport\_control\_play](schemas_schema_requests.md#transport_control_play)
- [transport\_control\_previous](schemas_schema_requests.md#transport_control_previous)
- [transport\_control\_seek\_to\_index](schemas_schema_requests.md#transport_control_seek_to_index)
- [update\_current\_entry](schemas_schema_requests.md#update_current_entry)
- [update\_playlist\_entry](schemas_schema_requests.md#update_playlist_entry)
- [version](schemas_schema_requests.md#version)

## Variables

### available\_output\_devices

• `Const` **available\_output\_devices**: `ZodObject`<{ `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `orchestration`: `string`  }, { `orchestration`: `string`  }\>

___

### delete\_playlist

• `Const` **delete\_playlist**: `ZodObject`<{ `loop`: `ZodBoolean` ; `name`: `ZodString` ; `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `loop`: `boolean` ; `name`: `string` ; `orchestration`: `string`  }, { `loop`: `boolean` ; `name`: `string` ; `orchestration`: `string`  }\>

___

### get\_autostart\_playlist

• `Const` **get\_autostart\_playlist**: `ZodObject`<{ `head_index`: `ZodNumber` ; `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `head_index`: `number` ; `orchestration`: `string`  }, { `head_index`: `number` ; `orchestration`: `string`  }\>

___

### insert\_playlist\_entry

• `Const` **insert\_playlist\_entry**: `ZodObject`<{ `aspect`: `ZodNumber` ; `chroma_depth`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\>\> ; `cols`: `ZodNumber` ; `crop_pos_x`: `ZodNumber` ; `crop_pos_y`: `ZodNumber` ; `depth_inversion`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\>\> ; `depth_loc`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>, `ZodLiteral`<``2``\>, `ZodLiteral`<``3``\>]\>\> ; `depthiness`: `ZodOptional`<`ZodNumber`\> ; `focus`: `ZodNumber` ; `id`: `ZodNumber` ; `index`: `ZodNumber` ; `isRGBD`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `name`: `ZodString` ; `orchestration`: `ZodString` ; `rows`: `ZodNumber` ; `tag`: `ZodOptional`<`ZodString`\> ; `uri`: `ZodString` ; `view_count`: `ZodNumber` ; `zoom`: `ZodOptional`<`ZodNumber`\>  }, ``"strip"``, `ZodTypeAny`, { `aspect`: `number` ; `chroma_depth?`: ``0`` \| ``1`` ; `cols`: `number` ; `crop_pos_x`: `number` ; `crop_pos_y`: `number` ; `depth_inversion?`: ``0`` \| ``1`` ; `depth_loc?`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness?`: `number` ; `focus`: `number` ; `id`: `number` ; `index`: `number` ; `isRGBD`: ``0`` \| ``1`` ; `name`: `string` ; `orchestration`: `string` ; `rows`: `number` ; `tag?`: `string` ; `uri`: `string` ; `view_count`: `number` ; `zoom?`: `number`  }, { `aspect`: `number` ; `chroma_depth?`: ``0`` \| ``1`` ; `cols`: `number` ; `crop_pos_x`: `number` ; `crop_pos_y`: `number` ; `depth_inversion?`: ``0`` \| ``1`` ; `depth_loc?`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness?`: `number` ; `focus`: `number` ; `id`: `number` ; `index`: `number` ; `isRGBD`: ``0`` \| ``1`` ; `name`: `string` ; `orchestration`: `string` ; `rows`: `number` ; `tag?`: `string` ; `uri`: `string` ; `view_count`: `number` ; `zoom?`: `number`  }\>

___

### instance\_playlist

• `Const` **instance\_playlist**: `ZodObject`<{ `loop`: `ZodBoolean` ; `name`: `ZodString` ; `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `loop`: `boolean` ; `name`: `string` ; `orchestration`: `string`  }, { `loop`: `boolean` ; `name`: `string` ; `orchestration`: `string`  }\>

___

### instance\_studio\_playlist

• `Const` **instance\_studio\_playlist**: `ZodObject`<{ `loop`: `ZodBoolean` ; `name`: `ZodString` ; `orchestration`: `ZodString` ; `playlist_path`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `loop`: `boolean` ; `name`: `string` ; `orchestration`: `string` ; `playlist_path`: `string`  }, { `loop`: `boolean` ; `name`: `string` ; `orchestration`: `string` ; `playlist_path`: `string`  }\>

___

### orchestration

• `Const` **orchestration**: `ZodObject`<{}, ``"strict"``, `ZodTypeAny`, {}, {}\>

___

### play\_playlist

• `Const` **play\_playlist**: `ZodObject`<{ `head_index`: `ZodNumber` ; `name`: `ZodString` ; `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `head_index`: `number` ; `name`: `string` ; `orchestration`: `string`  }, { `head_index`: `number` ; `name`: `string` ; `orchestration`: `string`  }\>

___

### set\_autostart\_playlist

• `Const` **set\_autostart\_playlist**: `ZodObject`<{ `head_index`: `ZodNumber` ; `orchestration`: `ZodString` ; `playlist_name`: `ZodString` ; `playlist_path`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `head_index`: `number` ; `orchestration`: `string` ; `playlist_name`: `string` ; `playlist_path`: `string`  }, { `head_index`: `number` ; `orchestration`: `string` ; `playlist_name`: `string` ; `playlist_path`: `string`  }\>

___

### set\_named\_autostart\_playlist

• `Const` **set\_named\_autostart\_playlist**: `ZodObject`<{ `head_index`: `ZodNumber` ; `orchestration`: `ZodString` ; `playlist_name`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `head_index`: `number` ; `orchestration`: `string` ; `playlist_name`: `string`  }, { `head_index`: `number` ; `orchestration`: `string` ; `playlist_name`: `string`  }\>

___

### show\_window

• `Const` **show\_window**: `ZodObject`<{ `head_index`: `ZodNumber` ; `orchestration`: `ZodString` ; `show_window`: `ZodBoolean`  }, ``"strip"``, `ZodTypeAny`, { `head_index`: `number` ; `orchestration`: `string` ; `show_window`: `boolean`  }, { `head_index`: `number` ; `orchestration`: `string` ; `show_window`: `boolean`  }\>

___

### transport\_control\_next

• `Const` **transport\_control\_next**: `ZodObject`<{ `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `orchestration`: `string`  }, { `orchestration`: `string`  }\>

___

### transport\_control\_pause

• `Const` **transport\_control\_pause**: `ZodObject`<{ `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `orchestration`: `string`  }, { `orchestration`: `string`  }\>

___

### transport\_control\_play

• `Const` **transport\_control\_play**: `ZodObject`<{ `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `orchestration`: `string`  }, { `orchestration`: `string`  }\>

___

### transport\_control\_previous

• `Const` **transport\_control\_previous**: `ZodObject`<{ `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `orchestration`: `string`  }, { `orchestration`: `string`  }\>

___

### transport\_control\_seek\_to\_index

• `Const` **transport\_control\_seek\_to\_index**: `ZodObject`<{ `index`: `ZodNumber` ; `orchestration`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `index`: `number` ; `orchestration`: `string`  }, { `index`: `number` ; `orchestration`: `string`  }\>

___

### update\_current\_entry

• `Const` **update\_current\_entry**: `ZodObject`<`extendShape`<{ `name`: `ZodString` ; `orchestration`: `ZodString`  }, `Record`<`requiredKeys`<`baseObjectOutputType`<{ `aspect`: `ZodOptional`<`ZodNumber`\> ; `chroma_depth`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `cols`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_x`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_y`: `ZodOptional`<`ZodNumber`\> ; `depth_cutoff`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``1``\>, `ZodLiteral`<``0``\>]\>\> ; `depth_inversion`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `depth_loc`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>, `ZodLiteral`<``2``\>, `ZodLiteral`<``3``\>]\> ; `depthiness`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = DEPTHINESS.range; `filter_mode`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = FILTER\_MODE.range; `focus`: `ZodOptional`<`ZodNumber`\> ; `gaussian_sigma`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = GAUSSIAN\_SIGMA.range; `rows`: `ZodOptional`<`ZodNumber`\> ; `zoom`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = ZOOM.range }\>\> \| `optionalKeys`<`baseObjectOutputType`<{ `aspect`: `ZodOptional`<`ZodNumber`\> ; `chroma_depth`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `cols`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_x`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_y`: `ZodOptional`<`ZodNumber`\> ; `depth_cutoff`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``1``\>, `ZodLiteral`<``0``\>]\>\> ; `depth_inversion`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `depth_loc`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>, `ZodLiteral`<``2``\>, `ZodLiteral`<``3``\>]\> ; `depthiness`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = DEPTHINESS.range; `filter_mode`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = FILTER\_MODE.range; `focus`: `ZodOptional`<`ZodNumber`\> ; `gaussian_sigma`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = GAUSSIAN\_SIGMA.range; `rows`: `ZodOptional`<`ZodNumber`\> ; `zoom`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = ZOOM.range }\>\>, `ZodOptional`<`ZodString`\>\>\>, ``"strip"``, `ZodTypeAny`, { `aspect`: `undefined` \| `string` ; `chroma_depth`: `undefined` \| `string` ; `cols`: `undefined` \| `string` ; `crop_pos_x`: `undefined` \| `string` ; `crop_pos_y`: `undefined` \| `string` ; `depth_cutoff`: `undefined` \| `string` ; `depth_inversion`: `undefined` \| `string` ; `depth_loc`: `undefined` \| `string` ; `depthiness`: `undefined` \| `string` ; `filter_mode`: `undefined` \| `string` ; `focus`: `undefined` \| `string` ; `gaussian_sigma`: `undefined` \| `string` ; `name`: `string` ; `orchestration`: `string` ; `rows`: `undefined` \| `string` ; `zoom`: `undefined` \| `string`  }, { `aspect`: `undefined` \| `string` ; `chroma_depth`: `undefined` \| `string` ; `cols`: `undefined` \| `string` ; `crop_pos_x`: `undefined` \| `string` ; `crop_pos_y`: `undefined` \| `string` ; `depth_cutoff`: `undefined` \| `string` ; `depth_inversion`: `undefined` \| `string` ; `depth_loc`: `undefined` \| `string` ; `depthiness`: `undefined` \| `string` ; `filter_mode`: `undefined` \| `string` ; `focus`: `undefined` \| `string` ; `gaussian_sigma`: `undefined` \| `string` ; `name`: `string` ; `orchestration`: `string` ; `rows`: `undefined` \| `string` ; `zoom`: `undefined` \| `string`  }\>

___

### update\_playlist\_entry

• `Const` **update\_playlist\_entry**: `ZodObject`<`extendShape`<{ `orchestration`: `ZodString` ; `playlistIndex`: `ZodNumber` ; `playlistName`: `ZodString`  }, `Record`<`requiredKeys`<`baseObjectOutputType`<{ `aspect`: `ZodOptional`<`ZodNumber`\> ; `chroma_depth`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `cols`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_x`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_y`: `ZodOptional`<`ZodNumber`\> ; `depth_cutoff`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``1``\>, `ZodLiteral`<``0``\>]\>\> ; `depth_inversion`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `depth_loc`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>, `ZodLiteral`<``2``\>, `ZodLiteral`<``3``\>]\> ; `depthiness`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = DEPTHINESS.range; `filter_mode`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = FILTER\_MODE.range; `focus`: `ZodOptional`<`ZodNumber`\> ; `gaussian_sigma`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = GAUSSIAN\_SIGMA.range; `rows`: `ZodOptional`<`ZodNumber`\> ; `zoom`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = ZOOM.range }\>\> \| `optionalKeys`<`baseObjectOutputType`<{ `aspect`: `ZodOptional`<`ZodNumber`\> ; `chroma_depth`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `cols`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_x`: `ZodOptional`<`ZodNumber`\> ; `crop_pos_y`: `ZodOptional`<`ZodNumber`\> ; `depth_cutoff`: `ZodOptional`<`ZodUnion`<[`ZodLiteral`<``1``\>, `ZodLiteral`<``0``\>]\>\> ; `depth_inversion`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>]\> ; `depth_loc`: `ZodUnion`<[`ZodLiteral`<``0``\>, `ZodLiteral`<``1``\>, `ZodLiteral`<``2``\>, `ZodLiteral`<``3``\>]\> ; `depthiness`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = DEPTHINESS.range; `filter_mode`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = FILTER\_MODE.range; `focus`: `ZodOptional`<`ZodNumber`\> ; `gaussian_sigma`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = GAUSSIAN\_SIGMA.range; `rows`: `ZodOptional`<`ZodNumber`\> ; `zoom`: `ZodEffects`<`ZodNumber`, `number`, `number`\> = ZOOM.range }\>\>, `ZodOptional`<`ZodString`\>\>\>, ``"strip"``, `ZodTypeAny`, { `aspect`: `undefined` \| `string` ; `chroma_depth`: `undefined` \| `string` ; `cols`: `undefined` \| `string` ; `crop_pos_x`: `undefined` \| `string` ; `crop_pos_y`: `undefined` \| `string` ; `depth_cutoff`: `undefined` \| `string` ; `depth_inversion`: `undefined` \| `string` ; `depth_loc`: `undefined` \| `string` ; `depthiness`: `undefined` \| `string` ; `filter_mode`: `undefined` \| `string` ; `focus`: `undefined` \| `string` ; `gaussian_sigma`: `undefined` \| `string` ; `orchestration`: `string` ; `playlistIndex`: `number` ; `playlistName`: `string` ; `rows`: `undefined` \| `string` ; `zoom`: `undefined` \| `string`  }, { `aspect`: `undefined` \| `string` ; `chroma_depth`: `undefined` \| `string` ; `cols`: `undefined` \| `string` ; `crop_pos_x`: `undefined` \| `string` ; `crop_pos_y`: `undefined` \| `string` ; `depth_cutoff`: `undefined` \| `string` ; `depth_inversion`: `undefined` \| `string` ; `depth_loc`: `undefined` \| `string` ; `depthiness`: `undefined` \| `string` ; `filter_mode`: `undefined` \| `string` ; `focus`: `undefined` \| `string` ; `gaussian_sigma`: `undefined` \| `string` ; `orchestration`: `string` ; `playlistIndex`: `number` ; `playlistName`: `string` ; `rows`: `undefined` \| `string` ; `zoom`: `undefined` \| `string`  }\>

___

### version

• `Const` **version**: `ZodObject`<{}, ``"strict"``, `ZodTypeAny`, {}, {}\>
