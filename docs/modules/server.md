[zod-endpoint](../README.md) / server

# Module: server

## Table of contents

### Functions

- [attach](server.md#attach)
- [bridge](server.md#bridge)
- [inputType](server.md#inputtype)
- [outputType](server.md#outputtype)

## Functions

### attach

▸ **attach**<`TSpec`\>(`router`, `middleware`, `endpoint`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSpec` | extends [`AnyEndpointSpec`](spec.md#anyendpointspec) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `router` | `Router` |
| `middleware` | `RequestHandler`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `endpoint` | `TSpec` |

#### Returns

`void`

#### Defined in

[server.ts:64](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/server.ts#L64)

___

### bridge

▸ **bridge**<`TIn`, `TOut`, `TSpec`\>(`endpoint`, `opts`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TIn` | `TIn` |
| `TOut` | `TOut` |
| `TSpec` | extends [`AnyEndpointSpec`](spec.md#anyendpointspec) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | `TSpec` |
| `opts` | `Object` |
| `opts.inputType` | (`inputType`: `ZodType`<[`Input`](spec.md#input)<`TSpec`\>, `ZodTypeDef`, [`Input`](spec.md#input)<`TSpec`\>\>) => `ZodType`<`TIn`, `ZodTypeDef`, `any`\> |
| `opts.outputType` | (`outputType`: `TSpec`[``"result"``]) => `ZodType`<`TOut`, `ZodTypeDef`, `any`\> |
| `opts.propagateError?` | (`err`: `any`, `res`: `Response`<`any`, `Record`<`string`, `any`\>\>) => `void` |
| `opts.propagateResult?` | (`result`: `TOut`, `res`: `Response`<`any`, `Record`<`string`, `any`\>\>) => `void` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `implementationSchema` | `ZodFunction`<`ZodTuple`<[`ZodType`<`TIn`, `ZodTypeDef`, `any`\>], `ZodUnknown`\>, `ZodUnion`<[`ZodType`<`TOut`, `ZodTypeDef`, `any`\>, `ZodPromise`<`ZodType`<`TOut`, `ZodTypeDef`, `any`\>\>]\>\> |
| `implement` | (`service`: (`input`: `TIn`) => `TOut` \| `Promise`<`TOut`\>) => { `attach`: (`router`: `Router`) => `void` ; `middleware`: (`req`: `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\>, `res`: `Response`<`any`, `Record`<`string`, `any`\>\>) => `Promise`<`void`\> ; `service`: (`input`: `TIn`) => `TOut` \| `Promise`<`TOut`\>  } |

#### Defined in

[server.ts:18](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/server.ts#L18)

___

### inputType

▸ **inputType**<`TSpec`\>(`endpoint`): `ZodType`<[`Input`](spec.md#input)<`TSpec`\>, `ZodTypeDef`, [`Input`](spec.md#input)<`TSpec`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSpec` | extends [`AnyEndpointSpec`](spec.md#anyendpointspec) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | `TSpec` |

#### Returns

`ZodType`<[`Input`](spec.md#input)<`TSpec`\>, `ZodTypeDef`, [`Input`](spec.md#input)<`TSpec`\>\>

#### Defined in

[server.ts:6](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/server.ts#L6)

___

### outputType

▸ **outputType**<`TSpec`\>(`endpoint`): `TSpec`[``"result"``]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSpec` | extends [`AnyEndpointSpec`](spec.md#anyendpointspec) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | `TSpec` |

#### Returns

`TSpec`[``"result"``]

#### Defined in

[server.ts:14](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/server.ts#L14)
