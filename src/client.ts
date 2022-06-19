import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as z from "zod";
import type { AnyEndpointSpec, Input } from "./spec";

interface RequestFn<TSpec extends AnyEndpointSpec> {
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

export const request = <TSpec extends AnyEndpointSpec>(
    ep: TSpec,
    axiosInst = axios
): RequestFn<TSpec> => {
    return (requestOptions, additionalOptions) => {
        const r: any = requestOptions;
        return axiosInst.request({
            method: ep.method,
            url: ep.path.toPath(requestOptions.params),
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
