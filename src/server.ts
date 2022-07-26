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

export const bridge = <TSpec extends AnyEndpointSpec>(
    endpoint: TSpec
) => ({
    through: <TIn, TOut> (trasformations: {
        inputType: (
            inputType: z.ZodType<Input<TSpec>, z.ZodTypeDef>
        ) => z.ZodType<TIn, z.ZodTypeDef, any>;
        outputType: (
            outputType: TSpec["result"]
        ) => z.ZodType<TOut, z.ZodTypeDef, any>;
        propagateResult?: (result: TOut, res: Express.Response) => void;
        propagateError?: (err: any, res: Express.Response) => void;
    }) => {
        const implInputType = trasformations.inputType(inputType(endpoint));
        const implOutputType = trasformations.outputType(outputType(endpoint));
        const implType = z
            .function()
            .args(implInputType)
            .returns(implOutputType.or(implOutputType.promise()));
        return {
            serviceContract: implType,
            toService(service: (input: TIn) => TOut | Promise<TOut>) {
                const middleware = async (
                    req: Express.Request,
                    res: Express.Response
                ) => {
                    try {
                        const input = implInputType.parse(req);
                        const result = implOutputType.parse(
                            await service(input)
                        );
                        (trasformations.propagateResult ?? propagateResult)(
                            result,
                            res
                        );
                    } catch (e) {
                        (trasformations.propagateError ?? propagateError)(
                            e,
                            res
                        );
                    }
                };
                const attach = (router: Express.Router) => {
                    const pattern = endpoint.path.toPattern();
                    console.log(
                        `Binding: ${endpoint.method} ${pattern} -> Service ${service.name}`
                    );
                    router[endpoint.method](pattern, middleware);
                };
                return {
                    middleware,
                    service,
                    attach,
                };
            },
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
