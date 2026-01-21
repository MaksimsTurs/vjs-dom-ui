export function assert(condition, message) {
  if(condition) {
    console.warn(message);
  }
};

export function fail(condition, message) {
  if(condition) {
    throw new Error(message);
  }
};