[zod-endpoint](../README.md) / [spec](../modules/spec.md) / PathStep

# Interface: PathStep<TParams\>

[spec](../modules/spec.md).PathStep

## Type parameters

| Name |
| :------ |
| `TParams` |

## Table of contents

### Methods

- [build](spec.PathStep.md#build)
- [literal](spec.PathStep.md#literal)
- [placeholder](spec.PathStep.md#placeholder)

## Methods

### build

▸ **build**(): [`PathSpec`](spec.PathSpec.md)<`TParams`\>

#### Returns

[`PathSpec`](spec.PathSpec.md)<`TParams`\>

#### Defined in

[spec.ts:62](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/spec.ts#L62)

___

### literal

▸ **literal**(`value`): [`PathStep`](spec.PathStep.md)<`TParams`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`PathStep`](spec.PathStep.md)<`TParams`\>

#### Defined in

[spec.ts:50](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/spec.ts#L50)

___

### placeholder

▸ **placeholder**<`TName`, `TZType`\>(`name`, `phType`): [`PathStep`](spec.PathStep.md)<`TParams` & { [name in string]: TZType["\_output"] }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TName` | extends `string` |
| `TZType` | extends `ZodType`<`any`, `ZodTypeDef`, `any`, `TZType`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `TName` |
| `phType` | `TZType` |

#### Returns

[`PathStep`](spec.PathStep.md)<`TParams` & { [name in string]: TZType["\_output"] }\>

#### Defined in

[spec.ts:51](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/spec.ts#L51)
