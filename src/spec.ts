import * as z from "zod";

export const PathPart = {
    literal: (value: string) => ({
        type: "literal" as const,
        value,
    }),
    placeholder: (name: string) => ({
        type: "placeholder" as const,
        name,
    }),
};

export type PathPart = ReturnType<typeof PathPart[keyof typeof PathPart]>;

export function path() {
    return propagatePath<{}>([], z.object({}));
}

export interface PathSpec<TParams> {
    toPattern: () => string;
    toPath: (params: TParams) => string;
    type: z.ZodType<TParams, z.ZodTypeDef, any>;
}

function propagatePath<TParams extends {} = {}>(
    parts: PathPart[],
    type: z.ZodType<TParams, z.ZodTypeDef, any>
) {
    return {
        literal: (value: string) =>
            propagatePath<TParams>(parts.concat(PathPart.literal(value)), type),
        placeholder: <TName extends string, TType>(
            name: TName,
            phType: z.ZodType<TType, z.ZodTypeDef, any>
        ) => {
            const objSpec = {
                [name]: phType,
            } as {
                [name in TName]: typeof phType;
            };
            return propagatePath(
                parts.concat(PathPart.placeholder(name)),
                type.and(z.object(objSpec))
            );
        },
        build: (): PathSpec<TParams> => ({
            toPattern: () =>
                "/" +
                parts
                    .map((it) =>
                        it.type === "literal" ? it.value : `:${it.name}`
                    )
                    .join("/"),
            toPath: (params: TParams) =>
                parts
                    .map((it) =>
                        it.type === "literal"
                            ? it.value
                            : `${(params as any)[it.name]}`
                    )
                    .join("/"),
            type,
        }),
    };
}

export type HttpMethod = "get" | "put" | "post" | "delete";

export type EndpointSpec<
    TMethod extends HttpMethod = HttpMethod,
    TParams = any,
    TQuery = {},
    TBody = {},
    THeaders = {},
    TRes = {}
> = {
    method: TMethod;
    path: PathSpec<TParams>;
    result: z.ZodType<TRes>;
} & (TQuery extends never
    ? {}
    : {
          query: z.ZodType<
              TQuery,
              z.ZodTypeDef,
              Record<string, string | string[] | null | undefined>
          >;
      }) &
    (THeaders extends never ? {} : { headers: z.ZodType<THeaders> }) &
    (TBody extends never ? {} : { body: z.ZodType<TBody> });

export type AnyEndpointSpec = EndpointSpec<HttpMethod, any, any, any, any, any>;

export const endpoint = <T extends AnyEndpointSpec>(spec: T) => spec;

export type Input<TSpec extends AnyEndpointSpec> = {
    params: ReturnType<TSpec["path"]["type"]["parse"]>;
} & ("query" extends keyof TSpec
    ? TSpec["query"] extends z.ZodType<unknown, any, infer TIn>
        ? { query: TIn }
        : {}
    : {}) &
    ("headers" extends keyof TSpec
        ? TSpec["headers"] extends z.ZodType<unknown, any, infer TIn>
            ? { headers: TIn }
            : {}
        : {}) &
    ("body" extends keyof TSpec
        ? TSpec["body"] extends z.ZodType<unknown, any, infer TIn>
            ? { body: TIn }
            : {}
        : {});
