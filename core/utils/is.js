export const isHTMLElement = (something) => something instanceof HTMLElement;
export const isTextNode = (something) => something instanceof Text;
export const isFunction = (something) => typeof something === "function";
export const isObject = (something) => typeof something === "object" && !isArray(something);
export const isArray = (something) => Array.isArray(something);