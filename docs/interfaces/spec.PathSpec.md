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

[spec.ts:46](https://github.com/lorefnon/zod-endpoint/blob/3866358/src/spec.ts#L46)

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

[spec.ts:45](https://github.com/lorefnon/zod-endpoint/blob/3866358/src/spec.ts#L45)

___

### toPattern

▸ **toPattern**(): `string`

#### Returns

`string`

#### Defined in

[spec.ts:44](https://github.com/lorefnon/zod-endpoint/blob/3866358/src/spec.ts#L44)
