import type { AnyEndpointSpec, Input } from "./spec";
import * as z from "zod";
import type Express from "express";
import pick from "lodash/pick";

export const inputType = <TSpec extends AnyEndpointSpec>(
    endpoint: TSpec
): z.ZodType<Input<TSpec>, z.ZodTypeDef> =>
    z.object({
        params: endpoint.path.type,
        ...pick(endpoint, ["query", "body", "headers"]),
    } as any) as any;

export const outputType = <TSpec extends AnyEndpointSpec>(
    endpoint: TSpec
): TSpec["result"] => endpoint.result;

export const bridge = <TIn, TOut, TSpec extends AnyEndpointSpec>(
    endpoint: TSpec,
    opts: {
        inputType: (
            inputType: z.ZodType<Input<TSpec>, z.ZodTypeDef>
        ) => z.ZodType<TIn, z.ZodTypeDef, any>;
        outputType: (
            outputType: TSpec["result"]
        ) => z.ZodType<TOut, z.ZodTypeDef, any>;
        propagateResult?: (result: TOut, res: Express.Response) => void;
        propagateError?: (err: any, res: Express.Response) => void;
    }
) => {
    const implInputType = opts.inputType(inputType(endpoint));
    const implOutputType = opts.outputType(outputType(endpoint));
    const implType = z
        .function()
        .args(implInputType)
        .returns(implOutputType.or(implOutputType.promise()));
    return {
        implementationSchema: implType,
        implement(service: (input: TIn) => TOut | Promise<TOut>) {
            const middleware = async (
                req: Express.Request,
                res: Express.Response
            ) => {
                try {
                    const input = implInputType.parse(req);
                    const result = implOutputType.parse(await service(input));
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
                service,
                attach,
            };
        },
    };
};

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
