export const isString      = (something) => typeof something === "string";
export const isFunction    = (something) => typeof something === "function";
export const isObject      = (something) => typeof something === "object" && something !== null && !Array.isArray(something);
export const isArray       = (something) => Array.isArray(something);
export const isUndefined   = (something) => something === undefined;
export const isNull        = (something) => something === null;