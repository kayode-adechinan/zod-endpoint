[zod-endpoint](../README.md) / spec

# Module: spec

## Table of contents

### Interfaces

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

[spec.ts:115](https://github.com/lorefnon/zod-endpoint/blob/9c603d0/src/spec.ts#L115)

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

[spec.ts:92](https://github.com/lorefnon/zod-endpoint/blob/9c603d0/src/spec.ts#L92)

___

### HttpMethod

Ƭ **HttpMethod**: ``"get"`` \| ``"put"`` \| ``"post"`` \| ``"delete"``

#### Defined in

[spec.ts:90](https://github.com/lorefnon/zod-endpoint/blob/9c603d0/src/spec.ts#L90)

___

### Input

Ƭ **Input**<`TSpec`\>: { `params`: `ReturnType`<`TSpec`[``"path"``][``"type"``][``"parse"``]\>  } & ``"query"`` extends keyof `TSpec` ? `TSpec`[``"query"``] extends `z.ZodType`<`unknown`, `any`, infer TIn\> ? { `query`: `TIn`  } : {} : {} & ``"headers"`` extends keyof `TSpec` ? `TSpec`[``"headers"``] extends `z.ZodType`<`unknown`, `any`, infer TIn\> ? { `headers`: `TIn`  } : {} : {} & ``"body"`` extends keyof `TSpec` ? `TSpec`[``"body"``] extends `z.ZodType`<`unknown`, `any`, infer TIn\> ? { `body`: `TIn`  } : {} : {}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSpec` | extends [`AnyEndpointSpec`](spec.md#anyendpointspec) |

#### Defined in

[spec.ts:122](https://github.com/lorefnon/zod-endpoint/blob/9c603d0/src/spec.ts#L122)

___

### PathPart

Ƭ **PathPart**: `ReturnType`<typeof [`PathPart`](spec.md#pathpart-1)[keyof typeof [`PathPart`](spec.md#pathpart-1)]\>

#### Defined in

[spec.ts:14](https://github.com/lorefnon/zod-endpoint/blob/9c603d0/src/spec.ts#L14)

## Variables

### PathPart

• `Const` **PathPart**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `literal` | (`value`: `string`) => { `type`: ``"literal"`` ; `value`: `string`  } |
| `placeholder` | (`name`: `string`) => { `name`: `string` ; `type`: ``"placeholder"``  } |

#### Defined in

[spec.ts:3](https://github.com/lorefnon/zod-endpoint/blob/9c603d0/src/spec.ts#L3)

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

[spec.ts:120](https://github.com/lorefnon/zod-endpoint/blob/9c603d0/src/spec.ts#L120)

___

### path

▸ **path**(): [`PathStep`](../interfaces/spec.PathStep.md)<{}\>

Fluent builder to define a path pattern

Eg. we can define a path specification for a pattern like /posts/:id like this:

   path()
      .literal("posts")
      .placeholder("id", z.string())
      .build()

#### Returns

[`PathStep`](../interfaces/spec.PathStep.md)<{}\>

#### Defined in

[spec.ts:26](https://github.com/lorefnon/zod-endpoint/blob/9c603d0/src/spec.ts#L26)
