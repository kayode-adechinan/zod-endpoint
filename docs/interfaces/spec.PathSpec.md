[zod-endpoint](../README.md) / [spec](../modules/spec.md) / PathSpec

# Interface: PathSpec<TParams\>

[spec](../modules/spec.md).PathSpec

## Type parameters

| Name |
| :------ |
| `TParams` |

## Table of contents

### Properties

- [type](spec.PathSpec.md#type)

### Methods

- [toPath](spec.PathSpec.md#topath)
- [toPattern](spec.PathSpec.md#topattern)

## Properties

### type

• **type**: `ZodType`<`TParams`, `ZodTypeDef`, `any`\>

#### Defined in

[spec.ts:33](https://github.com/lorefnon/zod-endpoint/blob/c9af7ef/src/spec.ts#L33)

## Methods

### toPath

▸ **toPath**(`params`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `TParams` |

#### Returns

`string`

#### Defined in

[spec.ts:32](https://github.com/lorefnon/zod-endpoint/blob/c9af7ef/src/spec.ts#L32)

___

### toPattern

▸ **toPattern**(): `string`

#### Returns

`string`

#### Defined in

[spec.ts:31](https://github.com/lorefnon/zod-endpoint/blob/c9af7ef/src/spec.ts#L31)
