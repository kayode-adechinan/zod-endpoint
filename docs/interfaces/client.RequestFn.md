[zod-endpoint](../README.md) / [client](../modules/client.md) / RequestFn

# Interface: RequestFn<TSpec\>

[client](../modules/client.md).RequestFn

## Type parameters

| Name | Type |
| :------ | :------ |
| `TSpec` | extends [`AnyEndpointSpec`](../modules/spec.md#anyendpointspec) |

## Callable

### RequestFn

▸ **RequestFn**(`requestOptions`, `additionalOptions?`): `Promise`<`AxiosResponse`<`TSpec`[``"result"``] extends `ZodType`<`TOut`, `any`, `any`\> ? `TOut` : `unknown`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestOptions` | [`Input`](../modules/spec.md#input)<`TSpec`\> |
| `additionalOptions?` | `Partial`<`AxiosRequestConfig`<`any`\>\> |

#### Returns

`Promise`<`AxiosResponse`<`TSpec`[``"result"``] extends `ZodType`<`TOut`, `any`, `any`\> ? `TOut` : `unknown`, `any`\>\>

#### Defined in

[client.ts:6](https://github.com/lorefnon/zod-endpoint/blob/845c57d/src/client.ts#L6)
