[zod-endpoint](../README.md) / spec

# Module: spec

## Table of contents

### Interfaces

- [PathOpts](../interfaces/spec.PathOpts.md)
- [PathSpec](../interfaces/spec.PathSpec.md)
- [PathStep](../interfaces/spec.PathStep.md)

### Type Aliases

- [AnyEndpointSpec](spec.md#anyendpointspec)
- [EndpointSpec](spec.md#endpointspec)
- [HttpMethod](spec.md#httpmethod)
- [Input](spec.md#input)
- [PathPart](spec.md#pathpart)

### Variables

- [PathPart](spec.md#pathpart-1)

### Functions

- [endpoint](spec.md#endpoint)
- [path](spec.md#path)

## Type Aliases

### AnyEndpointSpec

Ƭ **AnyEndpointSpec**: [`EndpointSpec`](spec.md#endpointspec)<[`HttpMethod`](spec.md#httpmethod), `any`, `any`, `any`, `any`, `any`\>

#### Defined in

[spec.ts:151](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/spec.ts#L151)

___

### EndpointSpec

Ƭ **EndpointSpec**<`TMethod`, `TParams`, `TQuery`, `TBody`, `THeaders`, `TRes`\>: { `method`: `TMethod` ; `path`: [`PathSpec`](../interfaces/spec.PathSpec.md)<`TParams`\> ; `result`: `z.ZodType`<`TRes`\>  } & `TQuery` extends `never` ? {} : { `query`: `z.ZodType`<`TQuery`, `z.ZodTypeDef`, `Record`<`string`, `string` \| `string`[] \| ``null`` \| `undefined`\>\>  } & `THeaders` extends `never` ? {} : { `headers`: `z.ZodType`<`THeaders`\>  } & `TBody` extends `never` ? {} : { `body`: `z.ZodType`<`TBody`\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TMethod` | extends [`HttpMethod`](spec.md#httpmethod) = [`HttpMethod`](spec.md#httpmethod) |
| `TParams` | `any` |
| `TQuery` | {} |
| `TBody` | {} |
| `THeaders` | {} |
| `TRes` | {} |

#### Defined in

[spec.ts:128](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/spec.ts#L128)

___

### HttpMethod

Ƭ **HttpMethod**: ``"get"`` \| ``"put"`` \| ``"post"`` \| ``"delete"``

#### Defined in

[spec.ts:126](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/spec.ts#L126)

___

### Input

Ƭ **Input**<`TSpec`\>: { `params`: `ReturnType`<`TSpec`[``"path"``][``"type"``][``"parse"``]\>  } & ``"query"`` extends keyof `TSpec` ? `TSpec`[``"query"``] extends `z.ZodType`<`unknown`, `any`, infer TIn\> ? { `query`: `TIn`  } : {} : {} & ``"headers"`` extends keyof `TSpec` ? `TSpec`[``"headers"``] extends `z.ZodType`<`unknown`, `any`, infer TIn\> ? { `headers`: `TIn`  } : {} : {} & ``"body"`` extends keyof `TSpec` ? `TSpec`[``"body"``] extends `z.ZodType`<`unknown`, `any`, infer TIn\> ? { `body`: `TIn`  } : {} : {}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSpec` | extends [`AnyEndpointSpec`](spec.md#anyendpointspec) |

#### Defined in

[spec.ts:158](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/spec.ts#L158)

___

### PathPart

Ƭ **PathPart**: `ReturnType`<typeof [`PathPart`](spec.md#pathpart-1)[keyof typeof [`PathPart`](spec.md#pathpart-1)]\>

#### Defined in

[spec.ts:21](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/spec.ts#L21)

## Variables

### PathPart

• `Const` **PathPart**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `literal` | (`value`: `string`) => { `type`: ``"literal"`` ; `value`: `string`  } |
| `placeholder` | (`name`: `string`, `options?`: `PlaceholderOptions`) => { `name`: `string` ; `options`: `undefined` \| `PlaceholderOptions` ; `type`: ``"placeholder"``  } |

#### Defined in

[spec.ts:9](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/spec.ts#L9)

## Functions

### endpoint

▸ **endpoint**<`T`\>(`spec`): `T`

Define an endpoint specification

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnyEndpointSpec`](spec.md#anyendpointspec) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `spec` | `T` |

#### Returns

`T`

#### Defined in

[spec.ts:156](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/spec.ts#L156)

___

### path

▸ **path**(`opts?`): [`PathStep`](../interfaces/spec.PathStep.md)<{}\>

Fluent builder to define a path pattern

Eg. we can define a path specification for a pattern like posts/:id like this:

   path()
      .literal("posts")
      .placeholder("id", z.string())
      .build()

Construct relative paths using `path({ absolute: false })`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`PathOpts`](../interfaces/spec.PathOpts.md) |

#### Returns

[`PathStep`](../interfaces/spec.PathStep.md)<{}\>

#### Defined in

[spec.ts:39](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/spec.ts#L39)
