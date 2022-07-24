import * as z from "zod";
import { match } from "ts-pattern";

interface PlaceholderOptions {
    isOptional?: boolean;
    isSplat?: boolean;
}

export const PathPart = {
    literal: (value: string) => ({
        type: "literal" as const,
        value,
    }),
    placeholder: (name: string, options?: PlaceholderOptions) => ({
        type: "placeholder" as const,
        name,
        options,
    }),
};

export type PathPart = ReturnType<typeof PathPart[keyof typeof PathPart]>;

export interface PathOpts {
    absolute?: boolean;
}

/**
 * Fluent builder to define a path pattern
 *
 * Eg. we can define a path specification for a pattern like posts/:id like this:
 *
 *    path()
 *       .literal("posts")
 *       .placeholder("id", z.string())
 *       .build()
 *
 * Construct relative paths using `path({ absolute: false })`
 */
export function path(opts?: PathOpts): PathStep<{}> {
    return propagatePath<{}>([], z.object({}), opts);
}

export interface PathSpec<TParams> {
    toPattern: () => string;
    toPath: (params: TParams) => string;
    type: z.ZodType<TParams, z.ZodTypeDef, any>;
}

export interface PathStep<TParams> {
    literal: (value: string) => PathStep<TParams>;
    placeholder: <
        TName extends string,
        TZType extends z.ZodType<any, z.ZodTypeDef, any>
    >(
        name: TName,
        phType: TZType
    ) => PathStep<
        TParams & {
            [name in TName]: TZType["_output"];
        }
    >;
    build: () => PathSpec<TParams>;
}

function propagatePath<TParams extends {} = {}>(
    parts: PathPart[],
    type: z.ZodType<any, z.ZodTypeDef, any>,
    opts?: PathOpts
): PathStep<TParams> {
    return {
        literal: (value: string) =>
            propagatePath<TParams>(
                parts.concat(PathPart.literal(value)),
                type,
                opts
            ),
        placeholder: (name, phType, options?: PlaceholderOptions) => {
            const objSpec = {
                [name]: phType,
            };
            return propagatePath(
                parts.concat(
                    PathPart.placeholder(name, {
                        isOptional: phType.isOptional(),
                        ...options,
                    })
                ),
                type.and(z.object(objSpec)),
                opts
            );
        },
        build: (): PathSpec<TParams> => ({
            toPattern: () =>
                (opts?.absolute === false ? "" : "/") +
                parts
                    .map((part) =>
                        match(part)
                            .with({ type: "literal" }, (part) => part.value)
                            .with({ type: "placeholder" }, (part) =>
                                match(part.options)
                                    .with(
                                        { isSplat: true },
                                        () => `:${part.name}*`
                                    )
                                    .otherwise(() =>
                                        part.options?.isOptional
                                            ? `:${part.name}?`
                                            : `:${part.name}`
                                    )
                            )
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

/**
 * Define an endpoint specification
 */
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
