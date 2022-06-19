export type MakeOthersOptional<T extends {}, TK extends keyof T> = Pick<T, TK> &
    Partial<T>;

export type FirstParam<TFn> = TFn extends (
    arg: infer TArg,
    ...args: unknown[]
) => unknown
    ? TArg
    : never;
