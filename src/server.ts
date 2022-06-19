import type { AnyEndpointSpec, Input } from "./spec";
import * as z from "zod";
import type Express from "express";
import pick from "lodash/pick";

export const inputType = <TSpec extends AnyEndpointSpec>(
    ep: TSpec
): z.ZodType<Input<TSpec>, z.ZodTypeDef> =>
    z.object({
        params: ep.path.type,
        ...pick(ep, ["query", "body", "headers"]),
    } as any) as any;

export const outputType = <TSpec extends AnyEndpointSpec>(
    ep: TSpec
): TSpec["result"] => ep.result;

export const bridge = <TIn, TOut, TSpec extends AnyEndpointSpec>(
    endpoint: TSpec,
    opts: {
        inputType: (
            inputType: z.ZodType<Input<TSpec>, z.ZodTypeDef>,
            req: Express.Request
        ) => z.ZodType<TIn, z.ZodTypeDef, any>;
        outputType: (
            outputType: TSpec["result"],
            req: Express.Request
        ) => z.ZodType<TOut, z.ZodTypeDef, any>;
        propagateResult?: (result: TOut, res: Express.Response) => void;
        propagateError?: (err: any, res: Express.Response) => void;
    }
) => ({
    implement(service: (input: TIn) => TOut | Promise<TOut>) {
        const middleware = async (
            req: Express.Request,
            res: Express.Response
        ) => {
            try {
                const input = opts
                    .inputType(inputType(endpoint), req)
                    .parse(req);
                const result = opts
                    .outputType(outputType(endpoint), req)
                    .parse(await service(input));
                (opts.propagateResult ?? propagateResult)(result, res);
            } catch (e) {
                (opts.propagateError ?? propagateError)(e, res);
            }
        };
        const attach = (router: Express.Router) => {
            router[endpoint.method](endpoint.path.toPattern(), middleware);
        };
        return {
            middleware,
            attach,
        };
    },
});

export const attach = <TSpec extends AnyEndpointSpec>(
    router: Express.Router,
    middleware: Express.RequestHandler,
    endpoint: TSpec
) => {
    router[endpoint.method](endpoint.path.toPattern(), middleware);
};

const propagateResult = (result: any, res: Express.Response) => {
    res.json(result);
};

const propagateError = (err: any, res: Express.Response) => {
    console.error(err);
    if (err instanceof z.ZodError) {
        res.status(422);
    } else {
        res.status(500);
    }
    res.end();
};
