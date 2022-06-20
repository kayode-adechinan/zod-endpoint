import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as z from "zod";
import type { AnyEndpointSpec, Input } from "./spec";

export interface RequestFn<TSpec extends AnyEndpointSpec> {
    (
        requestOptions: Input<TSpec>,
        additionalOptions?: Partial<AxiosRequestConfig>
    ): Promise<
        AxiosResponse<
            TSpec["result"] extends z.ZodType<infer TOut, any, any>
                ? TOut
                : unknown
        >
    >;
}

/**
 * Create a function to invoke the endpoint through axios
 *
 * @param endpoint endpoint specification
 * @param axiosInst axios instance to use, if omitted global axios will be used
 */
export const request = <TSpec extends AnyEndpointSpec>(
    endpoint: TSpec,
    axiosInst = axios
): RequestFn<TSpec> => {
    return (requestOptions, additionalOptions) => {
        const r: any = requestOptions;
        return axiosInst.request({
            method: endpoint.method,
            url: endpoint.path.toPath(requestOptions.params),
            params: r.query,
            data: r.body,
            headers: r.headers,
            ...additionalOptions,
        });
    };
};

type ServiceFacade<TEndpoints extends Record<string, AnyEndpointSpec>> = {
    [K in keyof TEndpoints]: RequestFn<TEndpoints[K]>;
};

/**
 * Convenience utility to mapping of endpoints to a mapping of request functions
 *
 *     const userService = service({
 *       getUser: getUserEndpoint,
 *       updateUser: updateUserEndpoint
 *     });
 *
 *     userService.getUser() // Makes HTTP request to getUserEndpoint
 */
export const service = <TEndpoints extends Record<string, AnyEndpointSpec>>(
    endpoints: TEndpoints,
    axiosInst = axios
): ServiceFacade<TEndpoints> => {
    const facade: any = {};
    for (const [key, endpoint] of Object.entries(endpoints)) {
        facade[key] = request(endpoint, axiosInst);
    }
    return facade;
};
