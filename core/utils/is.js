export const isHTMLElement = (something) => something instanceof HTMLElement;
export const isTextNode = (something) => something instanceof Text;

export const isString = (something) => typeof something === "string";
export const isFunction = (something) => typeof something === "function";
export const isObject = (something) => typeof something === "object" && !Array.isArray(something);
export const isArray = (something) => Array.isArray(something);
