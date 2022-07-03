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

[spec.ts:39](https://github.com/lorefnon/zod-endpoint/blob/ac3c3ce/src/spec.ts#L39)

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

[spec.ts:38](https://github.com/lorefnon/zod-endpoint/blob/ac3c3ce/src/spec.ts#L38)

___

### toPattern

▸ **toPattern**(): `string`

#### Returns

`string`

#### Defined in

[spec.ts:37](https://github.com/lorefnon/zod-endpoint/blob/ac3c3ce/src/spec.ts#L37)
