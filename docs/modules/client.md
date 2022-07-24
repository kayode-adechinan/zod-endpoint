[zod-endpoint](../README.md) / client

# Module: client

## Table of contents

### Interfaces

- [RequestFn](../interfaces/client.RequestFn.md)

### Functions

- [request](client.md#request)
- [service](client.md#service)

## Functions

### request

▸ **request**<`TSpec`\>(`endpoint`, `axiosInst?`): [`RequestFn`](../interfaces/client.RequestFn.md)<`TSpec`\>

Create a function to invoke the endpoint through axios

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSpec` | extends [`AnyEndpointSpec`](spec.md#anyendpointspec) |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `endpoint` | `TSpec` | `undefined` | endpoint specification |
| `axiosInst` | `AxiosStatic` | `axios` | axios instance to use, if omitted global axios will be used |

#### Returns

[`RequestFn`](../interfaces/client.RequestFn.md)<`TSpec`\>

#### Defined in

[client.ts:24](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/client.ts#L24)

___

### service

▸ **service**<`TEndpoints`\>(`endpoints`, `axiosInst?`): `ServiceFacade`<`TEndpoints`\>

Convenience utility to mapping of endpoints to a mapping of request functions

    const userService = service({
      getUser: getUserEndpoint,
      updateUser: updateUserEndpoint
    });

    userService.getUser() // Makes HTTP request to getUserEndpoint

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEndpoints` | extends `Record`<`string`, [`AnyEndpointSpec`](spec.md#anyendpointspec)\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `endpoints` | `TEndpoints` | `undefined` |
| `axiosInst` | `AxiosStatic` | `axios` |

#### Returns

`ServiceFacade`<`TEndpoints`\>

#### Defined in

[client.ts:55](https://github.com/lorefnon/zod-endpoint/blob/eb01508/src/client.ts#L55)
